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
import { useEffect, useState } from "react";
import { NestedCategoryTree } from "./NestedCategoryTree";
import { buildNestedCategoryTree } from "./buildNestedCategoryTree";
import { Icon } from "./Icon";
import { info } from "./icons";

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
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<Recipe[]>([]);
  const [cookModeRecipes, setCookModeRecipes] = useState<Recipe[]>([]);

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
    <>
      <div id="top" className="flex flex-col gap-xl">
        <div className="flex flex-col search-bar">
          <input
            type="text"
            placeholder="Search recipes"
            value={query}
            className="search-input"
            onChange={handleSearch}
          ></input>
          {results.length > 0 && (
            <ul className="search-results">
              {results.map((recipe) => (
                <li key={getRecipeId(recipe)}>
                  <a href={`#${getRecipeId(recipe)}`} className="py-s">
                    {recipe.title}
                  </a>
                </li>
              ))}
            </ul>
          )}
        </div>
        <NestedCategoryTree category={nestedCategoryTree} parentId="" />
        {sortedRecipes.map((recipe) => (
          <RecipeDisplay
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
        <hr />
        <p>
          <Icon icon={info} /> This website uses a Siri Shortcut to add
          ingredients to my grocery list in the Apple Reminders app. If you are
          also on an Apple device, you can create a shortcut of the same name:
          "Add To Grocery List", and take advantage of this feature.
        </p>
      </div>
      {cookModeRecipes.length && (
        <div className="cooking-recipes">
          {cookModeRecipes.map((recipe) => (
            <a href={`#${getRecipeId(recipe)}`}>{recipe.title}</a>
          ))}
        </div>
      )}
    </>
  );
}

export default App;
