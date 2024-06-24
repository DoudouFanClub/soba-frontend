import { useState } from "react";
import LabelButton from "./LabelButton";

import "./Scrollbar.css";

// Component Props
interface ScrollbarProps {
  // Placeholder String
  placeholder: string;
  // Username of Logged In User - For Handle On Select
  username: string;
  // List of Values displayed as LabelButtons
  values: string[];
  // Callback that triggers on LabelButton click
  onSelect: (username: string, title: string) => void;
}

// Scrollbar Component
export const Scrollbar = ({ placeholder, username, values, onSelect }: ScrollbarProps) => {
  const [activeButton, setActiveButton] = useState("");

  // Handle the onClick event when a LabelButton is clicked
  const handleOnClick = (username: string, title: string) => {
    // Call the onClick Callback Function
    onSelect(username, title);
    // Enable "active" className for "title"
    setActiveButton(title);
  };

  return (
    <div className="scrollbarStyle">
      {values ? (
        /*
          For all Values within "values", generate a LabelButton 
          and assign a Callback Function to it "onClick"
        */
        values.map((titleName, index) => (
          <LabelButton
            key={index}
            label={titleName}
            onClick={() => handleOnClick(username, titleName)}
            cssProps={`${titleName}` === `${activeButton}` ? "conversationTopicButtonsClicked" : "conversationTopicButtons"}
          />
        ))
      ) : (
        <p>{placeholder}</p>
      )}
    </div>
  );
};
