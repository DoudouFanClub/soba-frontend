import { useState } from "react";
import ReactDOM from "react-dom";
import LabelButton from "../components/LabelButton";

import "./NewChatView.css";
import TextBox from "../components/TextBox";
import DropdownBox from "../components/Dropdown";

interface PortalWindowProp {
  handleOnClick: () => void;
}

export function NewChatPortalView({ handleOnClick }: PortalWindowProp) {
  const [title, setTitle] = useState("");
  const [model, setModel] = useState("");

  const portalOnClick = (e: React.MouseEvent<HTMLDivElement>) => {
    e.stopPropagation();
  };

  return ReactDOM.createPortal(
    <>
      <div className="createConversationHiddenOverlay" onClick={handleOnClick}>
        <div className="createConversationPanel" onClick={portalOnClick}>
          <h1 className="headerTitle">Create a New Chat</h1>
          <TextBox placeholder="Title" onChange={setTitle} cssProps="titleTextBoxStyle" />
          <DropdownBox
            placeholder="Boulder Planet"
            options={["Boulder Planet", "Boulder Movement", "BFF", "Boulder Plus"]}
            handleModelSelect={setModel}
            cssProps="modelDropdownBoxStyle"
          />
          <LabelButton label="Confirm" onClick={handleOnClick} cssProps="confirmButtonStyle" />
        </div>
      </div>
    </>,
    document.body
  );
}
