import { Icon } from "./Icon";
import { circleCheck, link } from "./icons";
import styles from "./CopyButton.module.css";
import { useState, useRef, useEffect } from "react";

type CopyButtonProps = {
  copyText: string;
};

export function CopyButton(props: CopyButtonProps) {
  const [isCopied, setIsCopied] = useState(false);
  const timeoutRef = useRef<number | null>(null);

  const handleCopyClick = () => {
    try {
      navigator.clipboard.writeText(props.copyText);
      setIsCopied(true);

      // Reset the animation state after it finishes
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
      timeoutRef.current = window.setTimeout(() => setIsCopied(false), 2000); // Adjust timeout to match the animation duration
    } catch (err) {
      // Do nothing
    }
  };

  useEffect(() => {
    return () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, []);

  return (
    <div className={styles.copyButtonWrapper}>
      <button
        className="link inline-flex items-center"
        onClick={handleCopyClick}
      >
        <Icon icon={link} />
      </button>
      <div
        className={`${styles.copiedConfirmation} ${
          isCopied ? styles.show : ""
        }`}
      >
        <Icon icon={circleCheck} />
        Link copied
      </div>
    </div>
  );
}
