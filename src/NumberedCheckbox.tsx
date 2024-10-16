import styles from "./Checkbox.module.css";
import { Icon } from "./Icon";
import { check } from "./icons";

type NumberedCheckboxProps = {
  number: number;
} & React.InputHTMLAttributes<HTMLInputElement>;

export function NumberedCheckbox(props: NumberedCheckboxProps) {
  return (
    <label className={styles.numberedCheckbox}>
      {props.checked ? <Icon icon={check} /> : `${props.number}`}
      <input type="checkbox" {...props} />
    </label>
  );
}

type NumberedCheckboxListReplacementProps = {
  children: React.ReactNode;
};

export function NumberedCheckboxListReplacement(
  props: NumberedCheckboxListReplacementProps
) {
  return (
    <span className={styles.numberedCheckboxListReplacement}>
      {props.children}.
    </span>
  );
}
