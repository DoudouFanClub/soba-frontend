import { useState } from "react";
import LabelButton from "./LabelButton";

import { MenuButton } from "./MenuButton";
import "./Scrollbar.css";

// Component Props
interface ScrollbarProps {
  // Placeholder String
  placeholder: string;
  // Username of Logged In User - For Handle On Select
  username: string;
  activeTitle: string;
  // List of Values displayed as LabelButtons
  values: string[];
  disabled: boolean;
  // Callback that triggers on LabelButton click
  onSelect: (username: string, title: string) => void;
  OnHamburgerButtonClick: (command: string, title: string) => void;
}

// Scrollbar Component
export const Scrollbar = ({ placeholder, username, activeTitle, values, disabled, onSelect, OnHamburgerButtonClick }: ScrollbarProps) => {
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
      <div>
        {values ? (
          /*
          For all Values within "values", generate a LabelButton 
          and assign a Callback Function to it "onClick"
        */
          values.map((titleName, index) => (
            <div className="verticalStyle">
              <LabelButton
                key={index}
                label={titleName}
                onClick={() => handleOnClick(username, titleName)}
                cssProps={`${titleName}` === `${activeTitle}` ? "conversationTopicButtonsClicked" : "conversationTopicButtons"}
                disabled={disabled}
              />
              <MenuButton
                CssProp={`${titleName}` === `${activeTitle}` ? "menuButtonStyleClicked" : "menuButtonStyle"}
                ButtonList={["Delete Chat", "Rename Chat"]}
                OnButtonClick={OnHamburgerButtonClick}
                Title={titleName}
              />
            </div>
          ))
        ) : (
          <p>{placeholder}</p>
        )}
      </div>
    </div>
  );
};
