import React, { useState, useEffect, useRef } from "react";
import "./TextArea.css";

// Component Props
interface TextAreaProps {
  // Placeholder Text
  placeholder?: string;
  // Custom className
  cssProps?: string;
  // Callback Function on TextArea change
  onChange?: (value: string) => void;
  // Callback Function on Enter pressed
  onEnterDown: () => void;
  // Flag to lock TextArea
  isLocked?: boolean;
}

// TextArea Component - Used for Multi Line Input
export function TextArea({ placeholder, cssProps = "textBox", onChange, onEnterDown, isLocked = false }: TextAreaProps) {
  const [inputValue, setInputValue] = useState("");
  const textAreaRef = useRef<HTMLTextAreaElement>(null);

  // Effect to reset the input value when
  // TextArea is locked/unlocked
  useEffect(() => {
    console.log("TextArea Lock State Toggled");
    setInputValue("");
  }, [isLocked]);

  // Effect to adjust the height of the TextArea
  // based on the content - Limited by cssProps
  useEffect(() => {
    if (textAreaRef.current) {
      textAreaRef.current.style.height = "auto"; // Reset the height to auto
      textAreaRef.current.style.height = `${textAreaRef.current.scrollHeight}px`; // Set it to the scroll height
    }
  }, [inputValue]);

  // Handle change event when the user types in the textarea
  const handleChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    const newValue = event.target.value;
    setInputValue(newValue);
    if (onChange) {
      onChange(newValue);
    }
  };

  // Handle key down event for the Enter key
  const handleUserPromptOnKeyDown = (event: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (event.key === "Enter") {
      onEnterDown();
      setInputValue("");
    }
  };

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
