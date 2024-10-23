import { Fragment, useEffect, useState } from "react";
import { Recipe, getIngredientId, getRecipeId, getStepId } from "./recipes";
import { Icon } from "./Icon";
import {
  arrowRightSmall,
  externalLink,
  toc,
  lock,
  unlock,
  cart,
  cook,
  weight,
  paint,
} from "./icons";
import { Toggle } from "./Toggle";
import { Radio } from "./SingleSelect";
import { IngredientItem } from "./Ingredient";
import { PreparationStep } from "./PreparationStep";
import { ShareButton } from "./ShareButton";
import { CopyButton } from "./CopyButton";
import { useExpiringLocalStorage } from "./useExpiringLocalStorage";
import { useLocalStorage } from "./useLocalStorage";

export const TWELVE_HOURS_IN_MILLIS = 12 * 60 * 60 * 1000;

type RecipeDisplayProps = {
  recipe: Recipe;
  cookMode: boolean;
  cookModeOn: boolean;
  onCookModeChange: (checked: boolean) => void;
};

function initializeCheckedState<T>(
  iterable: T[],
  idFn: (item: T, index: number) => string,
  prevState: Record<string, boolean> = {}
): Record<string, boolean> {
  const newState: Record<string, boolean> = {};

  iterable.forEach((item, index) => {
    let id = idFn(item, index);
    newState[id] = prevState[id] ?? false;
  });

  return newState;
}

export function RecipeDisplay(props: RecipeDisplayProps) {
  let [multiplier, setMultiplier] = useExpiringLocalStorage(
    `${getRecipeId(props.recipe)}-multiplier`,
    props.recipe,
    1,
    TWELVE_HOURS_IN_MILLIS
  );
  let [lockIngredients, setLockIngredients] = useState(false);
  let [weightMode, setWeightMode] = useLocalStorage(
    `${getRecipeId(props.recipe)}-weight-mode`,
    props.recipe.defaultMeasurement === "weight"
  );
  let [checkedIngredients, setCheckedIngredients] = useExpiringLocalStorage<
    Record<string, boolean>, Recipe
  >(
    `${getRecipeId(props.recipe)}-ingredients`,
    props.recipe,
    () => initializeCheckedState(props.recipe.ingredients, getIngredientId),
    TWELVE_HOURS_IN_MILLIS
  );
  let [checkedSteps, setCheckedSteps] = useExpiringLocalStorage<
    Record<string, boolean>, Recipe
  >(
    `${getRecipeId(props.recipe)}-steps`,
    props.recipe,
    () => initializeCheckedState(props.recipe.steps, getStepId),
    TWELVE_HOURS_IN_MILLIS
  );
  let id = getRecipeId(props.recipe);

  let stepsCompleted = Object.values(checkedSteps).every(Boolean);

  return (
    <div
      id={`${getRecipeId(props.recipe)}-container`}
      className={`flex flex-col gap-m ${
        !props.cookMode && props.cookModeOn ? "opacity-25" : "opacity-100"
      }`}
    >
      <div>
        <div className="flex items-center">
          <a href="#" className="inline-flex items-center">
            <Icon icon={toc} />
          </a>
          <Icon icon={arrowRightSmall} />
          {props.recipe.categories.map((category, index) => {
            return (
              <Fragment key={category}>
                <a
                  href={`#${props.recipe.categories
                    .slice(0, index + 1)
                    .join("-")}`}
                >
                  {category}
                </a>
                {index < props.recipe.categories.length - 1 && (
                  <Icon icon={arrowRightSmall} />
                )}
              </Fragment>
            );
          })}
        </div>
        <div className="flex items-center gap-s">
          <h2 className="inline-flex" id={id}>
            {props.recipe.title}
          </h2>
          <CopyButton copyText={`${getUrlWithoutHash()}#${id}`} />
        </div>
        <div className="flex items-center flex-wrap gap-m pt-xs">
          {props.recipe.source && (
            <a
              href={props.recipe.source}
              target="_blank"
              className="inline-flex items-center gap-xs"
            >
              <Icon icon={externalLink} /> Source
            </a>
          )}
          <ShareButton
            url={`${getUrlWithoutHash()}#${id}`}
            title={props.recipe.title}
          />
        </div>
      </div>
      <div
        id={`${getRecipeId(props.recipe)}-recipe-controls`}
        className="flex flex-col gap-s"
      >
        <div>
          <Radio.List>
            <Radio
              checked={multiplier === 0.5}
              onSelect={() => setMultiplier(0.5)}
            >
              .5x
            </Radio>
            <Radio checked={multiplier === 1} onSelect={() => setMultiplier(1)}>
              1x
            </Radio>
            <Radio checked={multiplier === 2} onSelect={() => setMultiplier(2)}>
              2x
            </Radio>
            <Radio checked={multiplier === 3} onSelect={() => setMultiplier(3)}>
              3x
            </Radio>
            <Radio checked={multiplier === 4} onSelect={() => setMultiplier(4)}>
              4x
            </Radio>
          </Radio.List>
        </div>
        <div className="flex gap-s flex-wrap">
          <label className="flex items-center gap-s">
            <Toggle
              checkedIcon={cook}
              uncheckedIcon={cart}
              aria-label="cook-mode"
              checked={props.cookMode}
              onChange={(event) => props.onCookModeChange(event.target.checked)}
            />
            Cook mode
          </label>
          {props.recipe.ingredients.some((ingredient) => ingredient.weight) && (
            <label className="flex items-center gap-s">
              <Toggle
                checkedIcon={weight}
                uncheckedIcon={paint}
                aria-label="weight-mode"
                checked={weightMode}
                onChange={() => setWeightMode((wm) => !wm)}
              />
              Show weights
            </label>
          )}
          {props.recipe.ingredients.length > 0 && (
            <label className="flex items-center gap-s">
              <Toggle
                checkedIcon={lock}
                uncheckedIcon={unlock}
                aria-label="make-ingredients-sticky"
                checked={lockIngredients}
                onChange={() => setLockIngredients((locked) => !locked)}
              />
              Lock ingredients to top
            </label>
          )}
        </div>
      </div>
      <div>
        {props.recipe.ingredients.length > 0 && (
          <>
            <div className="flex items-baseline gap-m">
              <h3>Ingredients</h3>
              <button
                className={`link slide-in-from-right ${
                  props.cookMode &&
                  Object.values(checkedIngredients).some(Boolean)
                    ? "visible"
                    : ""
                }`}
                onClick={() =>
                  setCheckedIngredients((prevState) =>
                    Object.fromEntries(
                      Object.keys(prevState).map((key) => [key, false])
                    )
                  )
                }
              >
                Clear
              </button>
            </div>
            <ul
              className={`ingredients flex flex-col gap-xs p-s ${
                lockIngredients ? "sticky-ingredients" : ""
              }`}
              style={{ top: "-2" }}
            >
              {props.recipe.ingredients.map((ingredient, index) => {
                let id = getIngredientId(ingredient, index);
                return (
                  <IngredientItem
                    key={`${ingredient.name}${ingredient.quantity}${ingredient.measurement}`}
                    checked={checkedIngredients[id]}
                    ingredient={ingredient}
                    cookMode={props.cookMode}
                    multiplier={multiplier}
                    weightMode={weightMode}
                    onChange={(e) =>
                      props.cookMode &&
                      setCheckedIngredients((prevState) => ({
                        ...prevState,
                        [id]: e.target.checked,
                      }))
                    }
                  />
                );
              })}
            </ul>
          </>
        )}
        <div className="flex gap-m items-baseline">
          <h3>Preparation</h3>
          <button
            className={`link slide-in-from-right ${
              props.cookMode && Object.values(checkedSteps).some(Boolean)
                ? "visible"
                : ""
            }`}
            onClick={() =>
              setCheckedSteps((prevState) =>
                Object.fromEntries(
                  Object.keys(prevState).map((key) => [key, false])
                )
              )
            }
          >
            Clear
          </button>
        </div>
        <ol className={`flex flex-col gap-xs p-s ${stepsCompleted ? "steps-completed" : ""}`}>
          {props.recipe.steps.map((step, index) => {
            let id = getStepId(step, index);
            return (
              <PreparationStep
                key={step}
                style={{animationDelay: `${(props.recipe.steps.length - index - 1) * 0.1}s`}}
                step={step}
                cookMode={props.cookMode}
                number={index + 1}
                checked={checkedSteps[id]}
                onChange={(e) =>
                  props.cookMode &&
                  setCheckedSteps((prevState) => ({
                    ...prevState,
                    [id]: e.target.checked,
                  }))
                }
              />
            );
          })}
        </ol>
      </div>
    </div>
  );
}

function getUrlWithoutHash(): string {
  let urlString;
  try {
    urlString = window.location.href;
  } catch (err) {
    urlString = "https://sambehrens.github.io/recipes/";
  }
  const url = new URL(urlString);
  url.hash = "";
  return url.toString();
}
