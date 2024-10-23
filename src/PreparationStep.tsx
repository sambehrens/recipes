import { CSSProperties, ChangeEventHandler } from "react";
import {
  NumberedCheckbox,
  NumberedCheckboxListReplacement,
} from "./NumberedCheckbox";

type PreparationStepProps = {
  cookMode: boolean;
  number: number;
  step: string;
  checked: boolean;
  style?: CSSProperties;
  onChange: ChangeEventHandler<HTMLInputElement>;
};

export function PreparationStep(props: PreparationStepProps) {
  return (
    <li className="inline-flex items-start gap-s flex-wrap text-base" style={props.style}>
      <label className={`inline-flex items-start gap-s no-webkit-highlight text-base ${props.cookMode && props.checked ? "strike" : ""}`}>
        {props.cookMode ? (
          <NumberedCheckbox
            number={props.number}
            checked={props.checked}
            onChange={props.onChange}
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
