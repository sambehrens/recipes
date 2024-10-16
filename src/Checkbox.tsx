import styles from "./Checkbox.module.css";
import { Icon } from "./Icon";
import { check } from "./icons";
import { useState } from "react";

type CheckboxProps = {} & React.InputHTMLAttributes<HTMLInputElement>;

export function Checkbox(props: CheckboxProps) {
  const [isChecked, setIsChecked] = useState(props.checked || false);

  const handleInputChange = (isCheckedState: boolean, e: any) => {
    // Toggle checked state manually
    setIsChecked(isCheckedState);

    // Call onChange manually if provided
    if (props.onChange) {
      const event = {
        ...e,
        target: { ...e.target, checked: isCheckedState },
      };
      props.onChange(event as any); // Manually trigger the onChange event
    }
  };

  const handleMouseDown = (e: React.MouseEvent<HTMLLabelElement>) => {
    // Prevent the default focus event when mousedown happens
    e.preventDefault();
    handleInputChange(!isChecked, e);
  };

  const handleTouchStart = (e: React.TouchEvent<HTMLLabelElement>) => {
    handleInputChange(!isChecked, e);
  };

  return (
    <label
      className={styles.checkbox}
      onMouseDown={handleMouseDown} // Trigger state change on mousedown
      onTouchStart={handleTouchStart} // Trigger state change on touchstart
    >
      <Icon icon={check} />
      <input
        type="checkbox"
        checked={isChecked}
        {...props}
        onChange={() => {}} // Disable default onChange, since we're handling it manually
      />
    </label>
  );
}

type CheckboxListReplacementProps = {
  children: React.ReactNode;
};

export function CheckboxListReplacement(props: CheckboxListReplacementProps) {
  return (
    <span className={styles.checkboxListReplacement}>{props.children}</span>
  );
}
