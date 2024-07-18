// hamburger menu
import "./MenuButton.css";

import { useState } from "react";
import LabelButton from "./LabelButton";

interface MenuButtonProp {
  ButtonList: string[];
  Title: string;
  OnButtonClick(command: string, title: string): void;
  CssProp?: string;
}

export const MenuButton = ({ ButtonList, Title, OnButtonClick, CssProp }: MenuButtonProp) => {
  const [enableMenu, setEnableMenu] = useState(Boolean);

  const HandleMouseOver = (status: boolean) => {
    setEnableMenu(status);
  };

  return (
    <div>
      <button onMouseEnter={() => HandleMouseOver(true)} onMouseLeave={() => HandleMouseOver(false)} className={CssProp}>
        {enableMenu && ButtonList.length > 0 && (
          <div className="popup-overlay">
            {ButtonList.map((command, index) => (
              <p className="popup-content" key={index} onClick={() => OnButtonClick(command, Title)}>
                {command}
              </p>
            ))}
          </div>
        )}
      </button>
    </div>
  );
};
