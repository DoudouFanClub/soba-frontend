import React, { useState, useEffect, useRef } from "react";
import "./TextArea.css";

interface TextBoxProps {
  placeholder?: string;
  cssProps?: string;
  onChange?: (value: string) => void;
  onEnterDown?: () => void;
}

function TextBox({ placeholder, cssProps = "textBox", onChange, onEnterDown }: TextBoxProps) {
  const [inputValue, setInputValue] = useState("");
  const textAreaRef = useRef<HTMLTextAreaElement>(null);

  const handleChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    const newValue = event.target.value;
    setInputValue(newValue);
    if (onChange) {
      onChange(newValue);
    }
  };

  const handleUserPromptOnKeyDown = (event: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (event.key === "Enter") {
      onEnterDown && onEnterDown();
    }
  };

  useEffect(() => {
    if (textAreaRef.current) {
      textAreaRef.current.style.height = "auto"; // Reset the height to auto
      textAreaRef.current.style.height = `${textAreaRef.current.scrollHeight}px`; // Set it to the scroll height
    }
  }, [inputValue]);

  return (
    <textarea
      ref={textAreaRef}
      className={`textArea ${cssProps}`}
      placeholder={placeholder}
      value={inputValue}
      onChange={handleChange}
      onKeyDown={handleUserPromptOnKeyDown}
    />
  );
}

export default TextBox;
