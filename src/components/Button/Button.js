import React from "react";
import styles from "./Button.module.css";

export default function Button({
  value,
  onClick,
  width,
  fontSize,
  background,
  border,
}) {
  return (
    <button
      className={styles.button}
      onClick={onClick}
      value={value}
      style={{
        width: width,
        fontSize: fontSize,
        background: background,
        border: border,
      }}
    >
      {value}
    </button>
  );
}
