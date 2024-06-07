import React, {useState} from 'react';
import './TextBox.css';

interface TextBoxProps {
  placeholder?: string;
  value?: string;
  onChange?: (value: string) => void;
}

const TextBox: React.FC<TextBoxProps> = ({ placeholder = 'Speak to your local counsellor...', value = '', onChange }) => {
  const [inputValue, setInputValue] = useState(value);
  
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = event.target.value;
    setInputValue(newValue);
    if (onChange) {
      onChange(newValue);
    }
  };

  return (
    <input
      type="text"
      className="text-box"
      placeholder={placeholder}
      value={inputValue}
      onChange={handleChange}
    />
  );
};

export default TextBox;
