import { useState } from "react";
import ReactDOM from "react-dom";
import LabelButton from "../components/LabelButton";

import "./NewChatView.css";
import TextBox from "../components/TextBox";
import DropdownBox from "../components/Dropdown";
import { NewChatRequest, ApiCreateNewChatProps } from "../api/UserActionApi";

interface PortalWindowProp {
  username: string;
  handleClosePortal: () => void;
  handleOnNewChatCreated: (username: string, titleName: string) => void;
}

export function NewChatPortalView({ username, handleClosePortal, handleOnNewChatCreated }: PortalWindowProp) {
  const [title, setTitle] = useState("");
  const [model, setModel] = useState("");

  const portalOnClick = (e: React.MouseEvent<HTMLDivElement>) => {
    e.stopPropagation();
  };

  const handleCreateNewConversation = async (username: string, title: string, model: string) => {
    if (title.length > 50) {
      alert("Title has exceeded 50 characters! Current Length: " + title.length.toString());
      return;
    }

    var created: ApiCreateNewChatProps = await NewChatRequest(username, title);

    switch (created.response) {
      case "success": {
        handleClosePortal();
        handleOnNewChatCreated(username, title);
        break;
      }
      case "failure": {
        alert("Title is currently in use!");
        break;
      }
      default: {
        alert(`Unhandled error when creating New Chat, backend response: ${created}`);
      }
    }
  };

  return ReactDOM.createPortal(
    <>
      <div className="createConversationHiddenOverlay" onClick={handleClosePortal}>
        <div className="createConversationPanel" onClick={portalOnClick}>
          <h1 className="headerTitle">Create a New Chat</h1>
          <TextBox placeholder="Title" onChange={setTitle} cssProps="titleTextBoxStyle" />
          <DropdownBox
            placeholder="Boulder Planet"
            options={["Boulder Planet", "Boulder Movement", "BFF", "Boulder Plus"]}
            handleModelSelect={setModel}
            cssProps="modelDropdownBoxStyle"
          />
          <LabelButton label="Confirm" onClick={() => handleCreateNewConversation(username, title, model)} cssProps="confirmButtonStyle" />
        </div>
      </div>
    </>,
    document.body
  );
}
