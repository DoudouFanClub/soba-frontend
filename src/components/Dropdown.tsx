import React, { useEffect, useState } from "react";

interface DropdownBoxProps {
  placeholder: string;
  options: string[];
  cssProps?: string;
  handleModelSelect: (selectedModel: string) => void;
}

function DropdownBox({ placeholder, options, cssProps = "", handleModelSelect }: DropdownBoxProps) {
  const [modelName, setModelName] = useState("");

  const handleChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedOption = event.target.value;
    setModelName(selectedOption);
    handleModelSelect(selectedOption);
  };

  // Apply Placeholder Text
  useEffect(() => {
    if (placeholder) {
      setModelName(placeholder);
      handleModelSelect(placeholder);
    }
  }, [placeholder, handleModelSelect]);

  return (
    <div>
      {" "}
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
