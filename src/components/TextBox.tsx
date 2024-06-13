import React, { useState } from "react";
import "./TextBox.css";

interface TextBoxProps {
  placeholder?: string;
  cssProps?: string;
  onChange?: (value: string) => void;
}

function TextBox({ placeholder, cssProps = "text-box", onChange }: TextBoxProps) {
  const [inputValue, setInputValue] = useState("");

  // On Change, Update Value in TextBoxProps
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = event.target.value;
    setInputValue(newValue);
    if (onChange) {
      onChange(newValue);
    }
  };

  // Return a JSX
  return <input type="text" className={cssProps} placeholder={placeholder} value={inputValue} onChange={handleChange} />;
}

export default TextBox;
