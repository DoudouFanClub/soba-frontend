import { ReactHTMLElement, TextareaHTMLAttributes, useEffect, useState } from "react";

import TextBox from "./../components/TextBox";
import LabelButton from "./../components/LabelButton";
import { useNavigate } from "react-router-dom";
import ReactDOM from "react-dom";
import { ApiResponse, RegisterRequest } from "../api/ServerAccessApi";

import "./UserRegisterView.css";

interface changeViewProps {
  //changeView: (newView: string) => void; // not sure if needed, to be deleted?? ============================================!@!@!@!@!@!@@
  setDisableView: () => void;
}

export const UserRegisterView = ({ setDisableView }: changeViewProps) => {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const handleRegister = () => {
    // checks if register successful
    if (password !== confirmPassword) {
      alert("Passwords do not match!");
      return;
    }

    const RunLogic = async () => {
      const reply: ApiResponse = await RegisterRequest(username, password);

      switch (reply.response) {
        //true
        case "success": {
          console.log("Success Register");
          navigate(`/conversations/`, { state: { username: `${username}` } });

          break;
        }
        case "failure": {
          console.log("Failed Register");
          alert("Failed to register, Username exists!");
          break;
        }
      }
    };
    RunLogic();
  };

  useEffect(() => {
    setUsername(username);
    console.log(username);
  }, [username]);
  // To prevent clicks on the View within the Login page
  // to navigate back to the Home View
  const portalOnClick = (e: React.MouseEvent<HTMLDivElement>) => {
    e.stopPropagation();
  };

  return ReactDOM.createPortal(
    <div className="registerHiddenOverlay" onClick={setDisableView}>
      <div className="createConversationPanel" onClick={portalOnClick}>
        <h1 className="registerTextHeaderStyle">Register Account</h1>
        <TextBox placeholder="Username" cssProps="usernameTextBoxStyle" onChange={(value) => setUsername(value)} />
        <TextBox placeholder="Password" cssProps="passwordTextBoxStyle" onChange={(value) => setPassword(value)} />
        <TextBox placeholder="Confirm Password" cssProps="confirmPasswordTextBoxStyle" onChange={(value) => setConfirmPassword(value)} />
        <LabelButton label="Register" onClick={handleRegister} cssProps="registerButton" />
      </div>
    </div>,

    document.body
  );
};
