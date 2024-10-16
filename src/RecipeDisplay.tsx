import { useState } from "react";
import {Recipe, getRecipeId } from "./recipes";
import { Icon } from "./Icon";
import {
  arrowRightSmall,
  externalLink,
  toc,
  link,
  lock,
  unlock,
  cart,
  cook,
} from "./icons";
import { Toggle } from "./Toggle";
import { Radio } from "./SingleSelect";
import { IngredientItem } from "./Ingredient";
import { PreparationStep } from "./PreparationStep";

type RecipeDisplayProps = {
  recipe: Recipe;
  cookMode: boolean;
  cookModeOn: boolean;
  onCookModeChange: React.ChangeEventHandler<HTMLInputElement>;
};

export function RecipeDisplay(props: RecipeDisplayProps) {
  let [multiplier, setMultiplier] = useState(1);
  let [lockIngredients, setLockIngredients] = useState(false);
  let id = getRecipeId(props.recipe);
  return (
    <div
      className={`flex flex-col gap-s ${
        !props.cookMode && props.cookModeOn ? "opacity-25" : "opacity-100"
      }`}
    >
      <div>
        <div className="flex items-center">
          <a href="#top" className="inline-flex items-center">
            <Icon icon={toc} />
          </a>
          <Icon icon={arrowRightSmall} />
          {props.recipe.categories.map((category, index) => {
            return (
              <>
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
              </>
            );
          })}
        </div>
        <div className="flex items-center gap-s">
          <h2 className="inline-flex" id={id}>
            {props.recipe.title}
          </h2>
          <a href={`#${id}`} className="inline-flex items-center">
            <Icon icon={link} />
          </a>
        </div>
        {props.recipe.source && (
          <a
            href={props.recipe.source}
            target="_blank"
            className="inline-flex items-center gap-xs"
          >
            <Icon icon={externalLink} /> Source
          </a>
        )}
      </div>
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
          onChange={props.onCookModeChange}
        />Cook mode</label>
        <label className="flex items-center gap-s">
        <Toggle
          checkedIcon={lock}
          uncheckedIcon={unlock}
          aria-label="make-ingredients-sticky"
          checked={lockIngredients}
          onChange={() => setLockIngredients((locked) => !locked)}
        />Lock ingredients to top</label>
      </div>
      <div>
      <div className="flex items-center gap-s">
        <h3 className="inline-flex">Ingredients</h3>
      </div>
      <ul
        className={`ingredients flex flex-col gap-xs p-s ${
          lockIngredients ? "sticky-container" : ""
        }`} style={{top: "-2"}}
      >
        {props.recipe.ingredients.map((ingredient) => {
          return (
            <IngredientItem
              key={`${ingredient.name}${ingredient.quantity}${ingredient.measurement}`}
              ingredient={ingredient}
              cookMode={props.cookMode}
              multiplier={multiplier}
            />
          );
        })}
      </ul>
      <h3>Preparation</h3>
      <ol className="flex flex-col gap-xs p-s">
        {props.recipe.steps.map((step, index) => {
          return <PreparationStep key={step} step={step} cookMode={props.cookMode} number={index + 1} />;
        })}
      </ol>
        </div>
    </div>
  );
}
