import styles from "./Checkbox.module.css";
import { Icon } from "./Icon";
import { check } from "./icons";

type CheckboxProps = {} & React.InputHTMLAttributes<HTMLInputElement>;

export function Checkbox(props: CheckboxProps) {
  return (
    <label className={styles.checkbox}>
      <Icon icon={check} />
      <input type="checkbox" {...props} />
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
