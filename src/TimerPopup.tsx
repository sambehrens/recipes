import { useState } from "react";
import {
  TimerToken,
  formatDuration,
  formatCompact,
  getAdjustStep,
  getMidpoint,
} from "./parseTimerMarkers";
import styles from "./TimerPopup.module.css";

type TimerPopupProps = {
  token: TimerToken;
  onClose: () => void;
};

export function TimerPopup({ token, onClose }: TimerPopupProps) {
  const initialSeconds = token.isRange
    ? getMidpoint(token.minSeconds, token.maxSeconds)
    : token.minSeconds;

  const [currentSeconds, setCurrentSeconds] = useState(initialSeconds);

  const adjustStep = getAdjustStep(currentSeconds);
  const adjustLabel = adjustStep === 60 ? "1m" : adjustStep === 30 ? "30s" : "15s";

  const title = token.label
    ? `${token.label}: ${token.displayText}`
    : token.displayText;

  const shortcutInput = token.label
    ? `${currentSeconds}|${token.label}`
    : `${currentSeconds}`;
  const shortcutUrl = `shortcuts://run-shortcut?name=Start%20Timer&input=text&text=${encodeURIComponent(shortcutInput)}`;

  const presets = token.isRange
    ? [...new Set([token.minSeconds, getMidpoint(token.minSeconds, token.maxSeconds), token.maxSeconds])]
    : [];

  function adjust(delta: number) {
    setCurrentSeconds((prev) => Math.max(15, prev + delta));
  }

  return (
    <div className={styles.backdrop} onClick={onClose}>
      <div className={styles.popup} onClick={(e) => e.stopPropagation()}>
        <div className={styles.title}>{title}</div>
        <div className={styles.adjustRow}>
          <button
            className={styles.adjustButton}
            onClick={() => adjust(-adjustStep)}
            aria-label={`Decrease by ${adjustLabel}`}
          >
            −{adjustLabel}
          </button>
          <div className={styles.timeDisplay}>{formatDuration(currentSeconds)}</div>
          <button
            className={styles.adjustButton}
            onClick={() => adjust(adjustStep)}
            aria-label={`Increase by ${adjustLabel}`}
          >
            +{adjustLabel}
          </button>
        </div>
        {presets.length > 0 && (
          <div className={styles.presets}>
            {presets.map((s) => (
              <button
                key={s}
                className={`${styles.presetButton} ${s === currentSeconds ? styles.presetButtonActive : ""}`}
                onClick={() => setCurrentSeconds(s)}
              >
                {formatCompact(s)}
              </button>
            ))}
          </div>
        )}
        <div className={styles.actions}>
          <button className={styles.cancelButton} onClick={onClose}>
            Cancel
          </button>
          <a className={styles.startButton} href={shortcutUrl} onClick={onClose}>
            Start
          </a>
        </div>
      </div>
    </div>
  );
}
