import { useEffect, useRef, useState } from "react";
import { Recipe, getRecipeId } from "./recipes";
import styles from "./FloatingButton.module.css";
import { cx } from "./cx";

type FloatingButtonProps = {
  cookModeRecipes: Recipe[];
};

type RecipeEntry = {
  recipe: Recipe;
  direction: "up" | "down";
  onScreen: boolean;
};

const TOP_BUTTON_SCROLL_THRESHOLD = 200;

export function FloatingButton({ cookModeRecipes }: FloatingButtonProps) {
  const [recipes, setRecipes] = useState<RecipeEntry[]>(() =>
    cookModeRecipes.map((recipe) => ({
      recipe,
      direction: "down",
      onScreen: false,
    }))
  );
  const [showTopLink, setShowTopLink] = useState(false);
  const observer = useRef<IntersectionObserver | null>(null);

  useEffect(() => {
    // handle showing top link on first load
    if (window.scrollY > TOP_BUTTON_SCROLL_THRESHOLD) {
      setShowTopLink(true);
    }
  }, []);

  useEffect(() => {
    // handle showing 'Top' link
    function handleScroll() {
      const scrolledMoreThan200 = window.scrollY > TOP_BUTTON_SCROLL_THRESHOLD;
      setShowTopLink(scrolledMoreThan200);
    }

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [cookModeRecipes]);

  useEffect(() => {
    // Handle intersecting of cookModeRecipes
    if (observer.current) observer.current.disconnect();
    observer.current = new IntersectionObserver(
      (entries) => {
        setRecipes((oldRecipes) =>
          cookModeRecipes.map((recipe) => {
            let intersectedEntry = findLast(
              entries,
              (entry) => entry.target.id === `${getRecipeId(recipe)}-container`
            );
            if (intersectedEntry) {
              const direction =
                intersectedEntry.target.getBoundingClientRect().top > 0
                  ? "down"
                  : "up";
              return {
                recipe,
                direction,
                onScreen: intersectedEntry.isIntersecting,
              };
            }
            let oldRecipe = oldRecipes.find((old) => old.recipe === recipe);
            if (oldRecipe) {
              return oldRecipe;
            }
            return { recipe, direction: "up", onScreen: false };
          })
        );
      },
      { threshold: 0.1 }
    );

    cookModeRecipes.forEach((recipe) => {
      const target = document.getElementById(
        `${getRecipeId(recipe)}-container`
      );
      if (target && observer.current) observer.current.observe(target);
    });

    return () => observer.current?.disconnect();
  }, [cookModeRecipes]);

  let offScreenRecipes = recipes.filter((recipe) => !recipe.onScreen);

  return (
    <>
      <div className={styles.floatingButton}>
        <a
          href="#"
          className={cx(
            styles.animatedLink,
            showTopLink && cookModeRecipes.length === 0 && styles.visible
          )}
        >
          ↑ Top
        </a>
        <div className={"flex flex-col"}>
          {recipes.map(({ recipe, direction, onScreen }) => (
            <a
              key={getRecipeId(recipe)}
              href={`#${getRecipeId(recipe)}`}
              className={cx(styles.animatedLink, !onScreen && styles.visible)}
            >
              {direction === "up" ? "↑" : "↓"} {recipe.title}
            </a>
          ))}
        </div>
      </div>
    </>
  );
}

function findLast<T>(
  array: T[],
  predicate: (value: T) => boolean
): T | undefined {
  for (let i = array.length - 1; i >= 0; i--) {
    if (predicate(array[i])) {
      return array[i];
    }
  }
  return undefined;
}
