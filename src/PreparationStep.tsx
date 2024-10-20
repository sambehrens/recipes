import { useState } from "react";
import {
  NumberedCheckbox,
  NumberedCheckboxListReplacement,
} from "./NumberedCheckbox";

type PreparationStepProps = {
  cookMode: boolean;
  number: number;
  step: string;
};

export function PreparationStep(props: PreparationStepProps) {
  let [checked, setChecked] = useState(false);
  return (
    <li className="inline-flex items-start gap-s flex-wrap text-base">
      <label className={`inline-flex items-start gap-s no-webkit-highlight text-base ${props.cookMode && checked ? "strike" : ""}`}>
        {props.cookMode ? (
          <NumberedCheckbox
            number={props.number}
            checked={checked}
            onChange={(e) => props.cookMode && setChecked(e.target.checked)}
          />
        ) : (
          <NumberedCheckboxListReplacement>
            {props.number}
          </NumberedCheckboxListReplacement>
        )}
        <div className="pt-xs">
        {props.step}</div>
      </label>
    </li>
  );
}
