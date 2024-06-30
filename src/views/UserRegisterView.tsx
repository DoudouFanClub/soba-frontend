import ReactDOM from "react-dom";
import { useEffect, useState } from "react";
import { NavigateFunction, useNavigate } from "react-router-dom";

import TextBox from "./../components/TextBox";
import LabelButton from "./../components/LabelButton";
import { ApiResponse } from "./../api/HelperApi";
import { RegisterRequest } from "../api/ServerAccessApi";

import "./UserRegisterView.css";

interface changeViewProps {
  setDisableView: () => void;
}

const handleRegistration = (username: string, password: string, confirmPassword: string, navigate: NavigateFunction) => {
  // Verify if passwords are the same
  if (password !== confirmPassword) {
    alert("Passwords do not match!");
    return;
  }

  // Send to the backend to verify Login details
  const RunLogic = async () => {
    const reply: ApiResponse = await RegisterRequest(username, password);

    switch (reply.response) {
      case "success": {
        navigate(`/conversations/`, { state: { username: `${username}` } });
        break;
      }
      case "failure": {
        alert("Failed to register, Username exists!");
        break;
      }
    }
  };

  // Call the function above to handle Registration
  RunLogic();
};

// Handle click inside the portal (prevent backward propagation)
const disableBackwardPropagation = (e: React.MouseEvent<HTMLDivElement>) => {
  e.stopPropagation();
};

export const UserRegisterView = ({ setDisableView }: changeViewProps) => {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  // Effect to update the username state
  // Seems like there is a key delay between
  // each User Input
  useEffect(() => {
    setUsername(username);
  }, [username]);

  return ReactDOM.createPortal(
    <div className="registerHiddenOverlay" onClick={setDisableView}>
      <div className="registerMainPanel" onClick={disableBackwardPropagation}>
        <h1 className="registerTextHeaderStyle">Register</h1>

        {/* Input fields for username, password, and confirm password */}
        <TextBox type="text" placeholder="Username" cssProps="registerUsernameTextBoxStyle" onChange={(value) => setUsername(value)} />
        <TextBox type="password" placeholder="Password" cssProps="registerPasswordTextBoxStyle" onChange={(value) => setPassword(value)} />
        <TextBox
          type="password"
          placeholder="Confirm Password"
          cssProps="registerConfirmPasswordTextBoxStyle"
          onChange={(value) => setConfirmPassword(value)}
        />

        {/* Register button */}
        <LabelButton
          label="Register"
          onClick={() => handleRegistration(username, password, confirmPassword, navigate)}
          cssProps="registerButton"
        />
      </div>
    </div>,
    document.body
  );
};
