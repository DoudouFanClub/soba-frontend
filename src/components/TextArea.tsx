import React, { useState, useEffect, useRef } from "react";
import "./TextArea.css";

interface TextAreaProps {
  placeholder?: string;
  cssProps?: string;
  onChange?: (value: string) => void;
  onEnterDown: () => void;
  isLocked?: boolean;
}

export function TextArea({ placeholder, cssProps = "textBox", onChange, onEnterDown, isLocked = false }: TextAreaProps) {
  const [inputValue, setInputValue] = useState("");
  const textAreaRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    console.log("meow");
    setInputValue("");
  }, [isLocked]);

  const handleChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    const newValue = event.target.value;
    setInputValue(newValue);
    if (onChange) {
      onChange(newValue);
    }
  };

  const handleUserPromptOnKeyDown = (event: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (event.key === "Enter") {
      onEnterDown();
      setInputValue("");
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
      readOnly={isLocked}
      onKeyDown={handleUserPromptOnKeyDown}
    />
  );
}
