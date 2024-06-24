import React, { useEffect, useState } from "react";

// Component props
interface DropdownBoxProps {
  // Placeholder text
  placeholder: string;
  // Array of options to display in the dropdown
  options: string[];
  // className
  cssProps?: string;
  // Callback on Model selected
  handleModelSelect: (selectedModel: string) => void;
}

// DropdownBox component definition
function DropdownBox({ placeholder, options, cssProps = "", handleModelSelect }: DropdownBoxProps) {
  const [modelName, setModelName] = useState("");

  // Handle the change event when a new option is selected
  const handleChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedOption = event.target.value;
    setModelName(selectedOption);
    handleModelSelect(selectedOption);
  };

  // Apply Placeholder Text
  useEffect(() => {
    if (placeholder) {
      // For Local Display
      setModelName(placeholder);
      // Sets the "Model" variable in NewChatView for forwarding
      // to Backend
      handleModelSelect(placeholder);
    }
  }, [placeholder, handleModelSelect]);

  return (
    <div>
      {/* Render the dropdown box with the list of "options" */}
      <select value={modelName} onChange={handleChange} className={cssProps}>
        {options.map((modelStr, index) => (
          <option key={index} value={modelStr}>
            {modelStr}
          </option>
        ))}
      </select>
    </div>
  );
}

export default DropdownBox;
