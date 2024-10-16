import { Icon } from "./Icon";
import styles from "./Toggle.module.css";
import { IconObject } from "./icons";

type ToggleProps = {
  checkedIcon: IconObject;
  uncheckedIcon: IconObject;
} & React.InputHTMLAttributes<HTMLInputElement>;

export function Toggle(props: ToggleProps) {
  return (
    <label className={styles.toggle}>
      <div className={styles.toggleBob}>
        <Icon icon={props.checked ? props.checkedIcon : props.uncheckedIcon} />
      </div>
      <input type="checkbox" {...props} />
    </label>
  );
}
