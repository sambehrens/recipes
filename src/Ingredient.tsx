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
};

export function IngredientItem(props: IngredientItemProps) {
  let [checked, setChecked] = useState(false);
  let rawQuantity =
    props.ingredient.scaler === Scaler.Multiply
      ? props.ingredient.quantity * props.multiplier
      : props.ingredient.quantity;
  let quantity = new Fraction(rawQuantity).toFraction(true);
  let pluralized =
    rawQuantity > 1
      ? Measurement[props.ingredient.measurement].plural
      : Measurement[props.ingredient.measurement].display;
  let ingredientString = `${
    props.ingredient.measurement === "noQuantity" ? "" : quantity
  } ${pluralized} ${props.ingredient.name}`;
  return (
    <li className="inline-flex items-start flex-wrap">
      <label className={`inline-flex items-start gap-s no-webkit-highlight ${props.cookMode && checked ? "strike" : ""}`}>
        {props.cookMode ? (
          <Checkbox
            checked={checked}
            onChange={(e) => props.cookMode && setChecked(e.currentTarget.checked)}
          />
        ) : (
          <CheckboxListReplacement>
            <Icon icon={filledCircle} />
          </CheckboxListReplacement>
        )}
        <div className="pt-xs">
            {props.ingredient.measurement === "noQuantity" ? "" : quantity}{" "}
            {pluralized}{" "}
          {props.ingredient.name}{" "}
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
