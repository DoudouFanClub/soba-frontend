import React from "react";
import "./LabelButton.css";
// import defaultStyle from "./LabelButton.css";

interface ButtonProps {
  label: string;
  onClick?: () => void;
  cssProps?: string;
  type?: "button" | "submit" | "reset";
  disabled?: boolean;
}

function LabelButton({ label, onClick, cssProps = "button", type, disabled }: ButtonProps) {
  return (
    <button className={` ${cssProps} button`} onClick={onClick} type={type} disabled={disabled}>
      {label}
    </button>
  );
}

export default LabelButton;
