import React, { useState } from "react";
import ReactDOM from "react-dom";

import LabelButton from "../components/LabelButton";
import TextBox from "../components/TextBox";
import DropdownBox from "../components/Dropdown";
import { ApiResponse } from "../api/HelperApi";
import { NewChatRequest } from "../api/UserActionApi";

import "./NewChatView.css";

// Define the props interface for the portal window
interface PortalWindowProps {
  username: string;
  currTitle: string;
  handleClosePortal: () => void;
  handleOnNewChatCreated: (username: string, titleName: string) => void;
}

// Handle click inside the portal (prevent backward propagation)
const disableBackwardPropagation = (e: React.MouseEvent<HTMLDivElement>) => {
  e.stopPropagation();
};

// Create the NewChatPortalView component
export function NewChatPortalView({ username, currTitle, handleClosePortal, handleOnNewChatCreated }: PortalWindowProps) {
  // State variables for title and model
  const [title, setTitle] = useState("");
  const [model, setModel] = useState("");

  // Function to create a new conversation
  const handleCreateNewConversation = async (username: string, title: string, model: string) => {
    if (title.length > 50) {
      // Alert if title exceeds 50 characters
      alert(`Title has exceeded 50 characters! Current Length: ${title.length}`);
      return;
    }

    try {
      // Make an API request to create a new chat
      const created: ApiResponse = await NewChatRequest(username, title, currTitle);
      switch (created.response) {
        case "success":
          // Close the portal and notify about the new chat
          handleClosePortal();
          handleOnNewChatCreated(username, title);
          break;
        case "failure":
          alert("Title is currently in use!");
          break;
        default:
          // Log unhandled errors
          alert(`Unhandled error when creating New Chat, backend response: ${created}`);
      }
    } catch (error) {
      // Log any other errors
      console.error("Error creating new chat:", error);
    }
  };

  // Render the portal
  return ReactDOM.createPortal(
    <>
      {/* Grey background around the New Conversation Panel */}
      <div className="createConversationHiddenOverlay" onClick={handleClosePortal}>
        {/* Actual New Conversation Panel - We disable clicking within the Panel to disable */}
        {/* the Conversation Panel */}
        <div className="createConversationOpaquePanel" onClick={disableBackwardPropagation}>
          <h1 className="createConversationHeaderTitle">New Chat</h1>
          {/* Input field for the chat title */}
          <TextBox type="text" placeholder="Title" onChange={setTitle} cssProps="titleTextBoxStyle" />
          {/* Dropdown for selecting the chat model */}
          <DropdownBox
            placeholder="phi3:mini"
            options={["phi3:mini", "phi3:medium"]}
            handleModelSelect={setModel}
            cssProps="modelDropdownBoxStyle"
          />
          {/* Button to confirm and create the chat */}
          <LabelButton label="Confirm" onClick={() => handleCreateNewConversation(username, title, model)} cssProps="confirmButtonStyle" />
        </div>
      </div>
    </>,
    document.body
  );
}
