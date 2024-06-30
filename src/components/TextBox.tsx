import React, { useState } from "react";
import "./TextBox.css";

// Component Props
interface TextBoxProps {
  type: string;
  // Placeholder Text
  placeholder?: string;
  // Custom className
  cssProps?: string;
  // Callback Function for when TextBox Value changes
  onChange?: (value: string) => void;
}

// TextBox Component - Used for Single Line Input
function TextBox({ type = "text", placeholder, cssProps = "text-box", onChange }: TextBoxProps) {
  const [inputValue, setInputValue] = useState("");

  // On Change, Update Value in TextBoxProps
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = event.target.value;
    setInputValue(newValue);
    if (onChange) {
      onChange(newValue);
    }
  };

  // Return a TextBox
  return <input type={type} className={cssProps} placeholder={placeholder} value={inputValue} onChange={handleChange} />;
}

export default TextBox;
