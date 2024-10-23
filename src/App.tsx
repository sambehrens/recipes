import "./App.css";
import "./utilities.css";
import { Recipe, categories, getRecipeId, recipes } from "./recipes";
import { RecipeDisplay, TWELVE_HOURS_IN_MILLIS } from "./RecipeDisplay";
import { useEffect } from "react";
import { NestedCategoryTree } from "./NestedCategoryTree";
import { buildNestedCategoryTree } from "./buildNestedCategoryTree";
import { Icon } from "./Icon";
import { info } from "./icons";
import { useWakeLock } from "./useWakeLock";
import { SearchBar, sortedRecipes } from "./SearchBar";
import { FloatingButton } from "./FloatingButton";
import { useExpiringLocalStorage } from "./useExpiringLocalStorage";
import {CompleteScreen} from "./CompleteScreen";

const nestedCategoryTree = buildNestedCategoryTree(recipes, categories);

function App() {
  let [cookModeRecipes, setCookModeRecipes] = useExpiringLocalStorage<
    string[],
    null
  >("cook-mode-recipes", null, [], TWELVE_HOURS_IN_MILLIS);
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
    <div className="flex flex-col">
      <div className="flex flex-col gap-xl">
        <div className="flex flex-col gap-m">
          <h1>Sam's Recipes</h1>
          <SearchBar />
          <div className={cookModeRecipes.length !== 0 ? "opacity-25" : ""}>
            <NestedCategoryTree category={nestedCategoryTree} parentId="" />
          </div>
        </div>
        {sortedRecipes.map((recipe) => (
          <RecipeDisplay
            key={getRecipeId(recipe)}
            recipe={recipe}
            cookMode={cookModeRecipes.includes(getRecipeId(recipe))}
            cookModeOn={cookModeRecipes.length !== 0}
            onCookModeChange={(checked) =>
              setCookModeRecipes((current) =>
                checked
                  ? current.concat([getRecipeId(recipe)])
                  : current.filter((r) => r !== getRecipeId(recipe))
              )
            }
          />
        ))}
        <div
          className={`flex flex-col gap-m text-secondary bg-secondary p-m ${
            cookModeRecipes.length !== 0 ? "opacity-25" : ""
          }`}
        >
          <p className="text-s">
            <Icon icon={info} /> Disclaimer: These aren't so much "my recipes"
            as they are recipes that I got from somewhere else and enjoyed or
            were recommended to me with great fervor. Often times the person
            that I got them from was my Mom, so thanks Mom. When I have a source
            I link to it below the recipe title.
          </p>
          <p className="text-s">
            <Icon icon={info} /> This website uses a Siri Shortcut to add
            ingredients to my grocery list in the Apple Reminders app. If you
            are also on an Apple device, you can create a shortcut of the same
            name: "Add To Grocery List", and take advantage of this feature.
          </p>
        </div>
      </div>
      <FloatingButton
        cookModeRecipes={
          cookModeRecipes
            .map((id) => recipes.find((r) => getRecipeId(r) === id))
            .filter(Boolean) as Recipe[]
        }
      />
    </div>
  );
}

export default App;
