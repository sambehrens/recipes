import { CSSProperties, ChangeEventHandler, useId, useState } from "react";
import {
  NumberedCheckbox,
  NumberedCheckboxListReplacement,
} from "./NumberedCheckbox";
import { parseStepSegments, TimerToken } from "./parseTimerMarkers";
import { TimerPopup } from "./TimerPopup";
import styles from "./PreparationStep.module.css";

type PreparationStepProps = {
  cookMode: boolean;
  number: number;
  step: string;
  checked: boolean;
  style?: CSSProperties;
  onChange: ChangeEventHandler<HTMLInputElement>;
};

export function PreparationStep(props: PreparationStepProps) {
  const [activeTimer, setActiveTimer] = useState<TimerToken | null>(null);
  const checkboxId = useId();
  const segments = parseStepSegments(props.step);

  return (
    <li className="inline-flex items-start gap-s flex-wrap text-base" style={props.style}>
      <div className={`inline-flex items-start gap-s no-webkit-highlight text-base ${props.cookMode && props.checked ? "strike" : ""}`}>
        {props.cookMode ? (
          <NumberedCheckbox
            id={checkboxId}
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
          {segments.map((segment, i) =>
            typeof segment === "string" ? (
              props.cookMode ? (
                <label key={i} htmlFor={checkboxId}>{segment}</label>
              ) : (
                <span key={i}>{segment}</span>
              )
            ) : (
              <button
                key={i}
                className={styles.timerButton}
                onClick={(e) => {
                  e.preventDefault();
                  setActiveTimer(segment);
                }}
              >
                {segment.displayText}
              </button>
            )
          )}
        </div>
      </div>
      {activeTimer && (
        <TimerPopup token={activeTimer} onClose={() => setActiveTimer(null)} />
      )}
    </li>
  );
}
