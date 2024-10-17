import "./App.css";
import "./utilities.css";
import {
  Recipe,
  categories,
  getRecipeId,
  recipes,
  sortRecipesByCategory,
} from "./recipes";
import { RecipeDisplay } from "./RecipeDisplay";
import Fuse from "fuse.js";
import { Fragment, useEffect, useState } from "react";
import { NestedCategoryTree } from "./NestedCategoryTree";
import { buildNestedCategoryTree } from "./buildNestedCategoryTree";
import { Icon } from "./Icon";
import { arrowRightSmall, info } from "./icons";
import { useWakeLock } from "./useWakeLock";

let sortedRecipes = sortRecipesByCategory(recipes);

let fuse = new Fuse(sortedRecipes, {
  includeScore: true,
  keys: [
    {
      name: "title",
      weight: 1,
    },
    {
      name: "ingredients",
      weight: 0.3,
    },
    {
      name: "steps",
      weight: 0.1,
    },
    {
      name: "categories",
      weight: 0.7,
    },
  ],
});

const nestedCategoryTree = buildNestedCategoryTree(recipes, categories);

function App() {
  let [query, setQuery] = useState("");
  let [results, setResults] = useState<Recipe[]>([]);
  let [cookModeRecipes, setCookModeRecipes] = useState<Recipe[]>([]);
  let { isWakeLockActive, requestWakeLock, releaseWakeLock } = useWakeLock();

  useEffect(() => {
    if (cookModeRecipes.length > 0 && !isWakeLockActive) {
      requestWakeLock();
    } else if (cookModeRecipes.length === 0 && isWakeLockActive) {
      releaseWakeLock();
    }
    return () => {
      releaseWakeLock().catch((err) =>
        console.error("Error releasing wake lock during cleanup:", err)
      );
    };
  }, [cookModeRecipes, requestWakeLock, releaseWakeLock]);

  useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash.substring(1);

      // Capitalize the first letter and replace dashes with spaces for a nicer title
      const title = hash
        .replace(/-/g, " ")
        .replace(/\b\w/g, (char) => char.toUpperCase());
      document.title = title || "Sam's Recipes";
    };

    handleHashChange(); // Initial run
    window.addEventListener("hashchange", handleHashChange);

    return () => {
      window.removeEventListener("hashchange", handleHashChange);
    };
  }, []);

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    setQuery(value);

    if (value.trim() === "") {
      setResults([]);
    } else {
      const fuseResults = fuse.search(value);
      const recipeResults = fuseResults.map((result) => result.item);
      setResults(recipeResults);
    }
  };

  return (
    <div id="top" className="flex flex-col">
      <div className="flex flex-col gap-xl">
        <div className="flex flex-col gap-m">
          <h1>Sam's Recipes</h1>
          <div className="flex flex-col search-bar">
            <input
              type="search"
              placeholder="Search recipes"
              value={query}
              className="search-input"
              onChange={handleSearch}
            ></input>
            {results.length > 0 && (
              <ul className="search-results flex flex-col">
                {results.map((recipe) => (
                  <li key={getRecipeId(recipe)} className="flex flex-col">
                    <a href={`#${getRecipeId(recipe)}`} className="search-link">
                      <div className="search-breadcrumbs">
                        {recipe.categories.map((category, index) => {
                          return (
                            <Fragment key={category}>
                              <span>{category}</span>
                              {index < recipe.categories.length - 1 && (
                                <Icon icon={arrowRightSmall} />
                              )}
                            </Fragment>
                          );
                        })}
                      </div>
                      {recipe.title}
                    </a>
                  </li>
                ))}
              </ul>
            )}
          </div>
          <div>
            <NestedCategoryTree category={nestedCategoryTree} parentId="" />
          </div>
        </div>
        {sortedRecipes.map((recipe) => (
          <RecipeDisplay
            key={getRecipeId(recipe)}
            recipe={recipe}
            cookMode={cookModeRecipes.includes(recipe)}
            cookModeOn={cookModeRecipes.length !== 0}
            onCookModeChange={() =>
              setCookModeRecipes((current) =>
                current.includes(recipe)
                  ? current.filter((r) => r !== recipe)
                  : current.concat([recipe])
              )
            }
          />
        ))}
        <p>
          <Icon icon={info} /> This website uses a Siri Shortcut to add
          ingredients to my grocery list in the Apple Reminders app. If you are
          also on an Apple device, you can create a shortcut of the same name:
          "Add To Grocery List", and take advantage of this feature.
        </p>
      </div>
      {cookModeRecipes.length > 0 && (
        <div className="cooking-recipes">
          {cookModeRecipes.map((recipe) => (
            <a href={`#${getRecipeId(recipe)}`}>{recipe.title}</a>
          ))}
        </div>
      )}
    </div>
  );
}

export default App;
