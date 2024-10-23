import styles from "./CompleteScreen.module.css";
import { Icon } from "./Icon";
import { cx } from "./cx";
import { cook } from "./icons";

type CompleteScreenProps = {
  visible: boolean;
};

export function CompleteScreen(props: CompleteScreenProps) {
  return (
    <div className={cx(styles.background, props.visible && styles.visible)}>
      <div className={styles.expander}>
        <span className={styles.icon}>
          <Icon icon={cook} />
        </span>
        Time to eat!
      </div>
    </div>
  );
}
