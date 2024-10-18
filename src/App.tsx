import "./App.css";
import "./utilities.css";
import {
  Recipe,
  categories,
  getRecipeId,
  recipes,
} from "./recipes";
import { RecipeDisplay } from "./RecipeDisplay";
import { useEffect, useState } from "react";
import { NestedCategoryTree } from "./NestedCategoryTree";
import { buildNestedCategoryTree } from "./buildNestedCategoryTree";
import { Icon } from "./Icon";
import { info } from "./icons";
import { useWakeLock } from "./useWakeLock";
import {SearchBar, sortedRecipes} from "./SearchBar";

const nestedCategoryTree = buildNestedCategoryTree(recipes, categories);

function App() {
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

  return (
    <div id="top" className="flex flex-col">
      <div className="flex flex-col gap-xl">
        <div className="flex flex-col gap-m">
          <h1>Sam's Recipes</h1>
          <SearchBar />
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
