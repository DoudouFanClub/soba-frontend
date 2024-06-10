// src/App.tsx
import { useState } from "react";

import TextBox from "./components/TextBox";
import LabelButton from "./components/LabelButton";
import DropdownBox from "./components/Dropdown";
import { TestingPostRequest } from "./api/NetworkCommands";
import "./App.css";

/*
  Needed Views:
  - Login Page
  - Registration Page
  - Conversation Page
    - Conversation Scroll Bar (Display all chats)
    - User Query Section (Main chat)
  - New Chat Page
*/

/*
  Needed Components:
  - Enter Button
    - Label (LabelButton.tsx)
    - Icon (Not done yet)
  - Chat Box (TextBox.tsx)
  - New Chat Button (Not Component, but a view)
    - Select LLM Model (Potentially) - Popup + Dropdown to Select
  - Dropdown box (Dropdown.tsx)
  - Main Conversation Page
  - Text Bubble / Block
  - Individual Conversation Chats (Probably repurpose Label Button)
  - Conversation Options (Menu Button)
    - Delete
    - Rename
*/

function App() {
  /*
    Global Fields
  */
  // User Prompt - Text Box
  const [userPrompt, setUserPrompt] = useState("");
  // Model Name - Dropdown Box
  const [modelName, setModelName] = useState("");

  return (
    <div className="App">
      <h1>Local LLM</h1>
      <TextBox
        placeholder="Type something..."
        onChange={(value) => setUserPrompt(value)}
      />

      <LabelButton
        label="Click to post to Backend"
        onClick={TestingPostRequest}
      />
      {/* AlertOnClick(text) */}

      <p>You typed: {userPrompt}</p>

      <DropdownBox
        placeholder="OLLAMA"
        options={["OLLAMA", "CHATGPT", "PERPLEXITY"]}
        handleModelSelect={setModelName}
      ></DropdownBox>
      <p>Selected Model: {modelName}</p>
    </div>
  );
}

export default App;
