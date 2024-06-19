import React from "react";
import LabelButton from "./LabelButton";
import "./Scrollbar.css";

interface ScrollbarProps {
  placeholder: string;
  username: string;
  values: string[];
  onSelect: (username: string, title: string) => void;
}

export const Scrollbar = ({ placeholder, username, values, onSelect }: ScrollbarProps) => {
  const [activeButton, setActiveButton] = React.useState("");

  const handleOnClick = (username: string, title: string) => {
    onSelect(username, title);
    setActiveButton(title);
  };

  return (
    <div className="scrollbarStyle">
      {values ? (
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
