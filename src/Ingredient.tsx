import Fraction from "fraction.js";
import { Ingredient, Measurement, Scaler } from "./recipes";
import { Checkbox, CheckboxListReplacement } from "./Checkbox";
import { useState } from "react";
import { Icon } from "./Icon";
import { filledCircle } from "./icons";

type IngredientItemProps = {
  ingredient: Ingredient;
  cookMode: boolean;
  multiplier: number;
  weightMode: boolean;
};

export function IngredientItem(props: IngredientItemProps) {
  let [checked, setChecked] = useState(false);
  let quantityToUse =
    props.weightMode && props.ingredient.weight
      ? props.ingredient.weight.quantity
      : props.ingredient.quantity;
  let measurementToUse =
    props.weightMode && props.ingredient.weight
      ? props.ingredient.weight.measurement
      : props.ingredient.measurement;
  let rawQuantity =
    props.ingredient.scaler === Scaler.Multiply
      ? quantityToUse * props.multiplier
      : quantityToUse;
  let quantity = new Fraction(rawQuantity).toFraction(true);
  let pluralized =
    rawQuantity > 1
      ? Measurement[measurementToUse].plural
      : Measurement[measurementToUse].display;
  let ingredientString = `${
    measurementToUse === "noQuantity" ? "" : quantity
  } ${pluralized} ${props.ingredient.name}`;
  return (
    <li className="inline-flex items-start flex-wrap text-base">
      <label
        className={`inline-flex items-start gap-s no-webkit-highlight text-base ${
          props.cookMode && checked ? "strike" : ""
        }`}
      >
        {props.cookMode ? (
          <Checkbox
            checked={checked}
            onChange={(e) => props.cookMode && setChecked(e.target.checked)}
          />
        ) : (
          <CheckboxListReplacement>
            <Icon icon={filledCircle} />
          </CheckboxListReplacement>
        )}
        <div className="pt-xs">
          {ingredientString}{" "}
          {!props.cookMode && (
            <a
              href={`shortcuts://run-shortcut?name=Add%20To%20Grocery%20List&input=text&text=${encodeURIComponent(
                ingredientString
              )}`}
            >
              + to list
            </a>
          )}
        </div>
      </label>
    </li>
  );
}
