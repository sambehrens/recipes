import React from "react";
import styles from "./SingleSelect.module.css";

export type RadioProps = {
  children: React.ReactNode;
  checked?: boolean
  onSelect: () => void;
}

export function Radio(props: RadioProps) {
  return (
    <button
      className={`inline-flex cursor-pointer ${styles.singleSelectButton}`}
      role="radio"
      aria-checked={props.checked}
      tabIndex={props.checked ? 0 : -1}
      onClick={() => props.onSelect()}
    >
      {props.children}
    </button>
  );
}

export type RadioRowProps = {
  children: React.ReactNode;
  direction?: "row" | "column";
};

Radio.List = function RadioRow(props: RadioRowProps) {
  let { direction = "row" } = props;
  // navigate the buttons with arrow keys
  let handleKeyDown: React.KeyboardEventHandler<HTMLDivElement> =
    React.useCallback(
      (event) => {
        if (
          direction === "row" &&
          !["ArrowLeft", "ArrowRight"].includes(event.key)
        )
          return;
        if (
          direction === "column" &&
          !["ArrowDown", "ArrowUp"].includes(event.key)
        )
          return;
        let currentEl = event.currentTarget as HTMLElement;
        let element = event.target as HTMLElement;
        let focusableChildren = Array.from(
          currentEl.querySelectorAll(focusableSelectors)
        );
        let currentFocusedIndex = focusableChildren.findIndex(
          (el) => el === element
        );
        if (currentFocusedIndex === -1) return;
        let next = ["ArrowDown", "ArrowRight"].includes(event.key) ? 1 : -1;
        let newIndex = (currentFocusedIndex + next) % focusableChildren.length;
        if (newIndex === -1) {
          newIndex = focusableChildren.length - 1;
        }
        (focusableChildren[newIndex] as HTMLElement).focus();
      },
      [direction]
    );

  let flexDir = direction === "row" ? "flex-row" : "flex-col";
  return (
    <div
      role="radiogroup"
      className={`flex ${flexDir} ${styles.singleSelectButtonList}`}
      onKeyDown={handleKeyDown}
    >
      {props.children}
    </div>
  );
};

let focusableSelectors = [
  "a[href]",
  "area[href]",
  'input:not([type="hidden"]):not([type="radio"]):not([disabled])',
  'input[type="radio"]:not([disabled])',
  "select:not([disabled])",
  "textarea:not([disabled])",
  "button:not([disabled])",
  "iframe",
  "audio[controls]",
  "video[controls]",
  "[contenteditable]",
  "[tabindex]",
].join(",");
