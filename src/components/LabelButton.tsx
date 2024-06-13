import React from "react";
import "./LabelButton.css";

interface ButtonProps {
  label: string;
  onClick?: () => void;
  cssProps?: string;
  type?: "button" | "submit" | "reset";
  disabled?: boolean;
}

function LabelButton({ label, onClick, cssProps = "button", type, disabled }: ButtonProps) {
  return (
    <button className={cssProps} onClick={onClick} type={type} disabled={disabled}>
      {label}
    </button>
  );
}

export default LabelButton;
