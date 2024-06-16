import ReactDOM from "react-dom";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import TextBox from "./../components/TextBox";
import LabelButton from "./../components/LabelButton";
import { ApiResponse, LoginRequest } from "../api/ServerAccessApi";

import "./UserLoginView.css";

interface usernameCallbackProp {
  setUsernameCallback: (username: string) => void;
  setDisableView: () => void;
}

export const UserLoginView = ({ setUsernameCallback, setDisableView }: usernameCallbackProp) => {
  const navigate = useNavigate();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleOnClickLogin = async () => {
    // If Pass
    setUsernameCallback(username);

    const reply: ApiResponse = await LoginRequest(username, password);

    switch (reply.response) {
      case "success": {
        navigate("/conversations");
        break;
      }
      case "failure": {
        alert("Failed To Login, Wrong Password!");
        break;
      }
      case "invalid": {
        alert("Failed To Login, User Does Not Exist!");
      }
    }
  };

  useEffect(() => {
    setUsernameCallback(username);
  }, [username]);

  // To prevent clicks on the View within the Login page
  // to navigate back to the Home View
  const portalOnClick = (e: React.MouseEvent<HTMLDivElement>) => {
    e.stopPropagation();
  };

  return ReactDOM.createPortal(
    <>
      <div className="createConversationHiddenOverlay" onClick={setDisableView}>
        <div className="createConversationPanel" onClick={portalOnClick}>
          <h1 className="headerTitle">Login</h1>

          <TextBox placeholder="Username" cssProps="usernameTextBoxStyle" onChange={(value) => setUsername(value)} />
          <TextBox placeholder="Password" cssProps="passwordTextBoxStyle" onChange={(value) => setPassword(value)} />

          <LabelButton label="Login" onClick={handleOnClickLogin} cssProps="loginButton" />
        </div>
      </div>
    </>,
    document.body
  );
};
