import React, { useState } from "react";
import ReactDOM from "react-dom";
import { NavigateFunction, useNavigate } from "react-router-dom";

import TextBox from "./../components/TextBox";
import LabelButton from "./../components/LabelButton";
import { LoginRequest } from "../api/ServerAccessApi";
import { ApiResponse } from "../api/HelperApi";

import "./UserLoginView.css";

// Define the props interface for the portal window
interface UsernameCallbackProps {
  setDisableView: () => void;
}

// Handle login button click
const handleOnClickLogin = async (username: string, password: string, navigate: NavigateFunction) => {
  try {
    const reply: ApiResponse = await LoginRequest(username, password);
    switch (reply.response) {
      case "success":
        navigate("/conversations", { state: { username } });
        break;
      case "failure":
        alert("Failed To Login: Wrong Password!");
        break;
      case "invalid":
        alert("Failed To Login: User Does Not Exist!");
        break;
      default:
        console.error("Unhandled response:", reply);
    }
  } catch (error) {
    console.error("Error during login:", error);
  }
};

// Handle click inside the portal (prevent backward propagation)
const disableBackwardPropagation = (e: React.MouseEvent<HTMLDivElement>) => {
  e.stopPropagation();
};

export const UserLoginView = ({ setDisableView }: UsernameCallbackProps) => {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  return ReactDOM.createPortal(
    <>
      <div className="createConversationHiddenOverlay" onClick={setDisableView}>
        <div className="createConversationPanel" onClick={disableBackwardPropagation}>
          <h1 className="headerTitle">Login</h1>

          {/* Input fields for username and password */}
          <TextBox placeholder="Username" cssProps="usernameTextBoxStyle" onChange={(value) => setUsername(value)} />
          <TextBox placeholder="Password" cssProps="passwordTextBoxStyle" onChange={(value) => setPassword(value)} />

          {/* Login button */}
          <LabelButton label="Login" onClick={() => handleOnClickLogin(username, password, navigate)} cssProps="loginButton" />
        </div>
      </div>
    </>,
    document.body
  );
};
