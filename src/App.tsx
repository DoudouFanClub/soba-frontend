// src/App.tsx
import { useState } from "react";
//import { Routes, Route, useNavigate } from "react-router-dom"; // note that we can use useNavigate to toggle between different views
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";

import { HomeView } from "./views/HomeView";
import { NewChatView } from "./views/NewChatView";
import { UserLoginView } from "./views/UserLoginView";
import { UserLogoutView } from "./views/UserLogoutView";
import { UserRegisterView } from "./views/UserRegisterView";
import { ConversationView } from "./views/ConversationView";

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
  const [username, setUsername] = useState("");

  const updateUsername = (userName: string) => {
    setUsername(userName);
    console.log(username);
  };

  // Change the views tomorrow
  return (
    <BrowserRouter>
      <div>
        <Routes>
          <Route path="/" element={<HomeView />} />
          <Route
            path="/login"
            element={<UserLoginView setUsernameCallback={updateUsername} />}
          />
          <Route path="/register" element={<UserRegisterView />} />
          <Route
            path="/conversations"
            element={<ConversationView username={username} />}
          />
          <Route
            path="/new_chat"
            element={<NewChatView username={username} />}
          />
          <Route
            path="/logout"
            element={<UserLogoutView setUsernameCallback={updateUsername} />}
          />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
