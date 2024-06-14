import { useEffect, useState } from "react";

import TextBox from "./../components/TextBox";
import LabelButton from "./../components/LabelButton";
import { ApiResponse, LoginRequest, RegisterRequest } from "./../api/NetworkCommands";
import { useNavigate } from "react-router-dom";
import ReactDOM from "react-dom";
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
    // if Pass
    setUsernameCallback(username);

    const reply: string = await LoginRequest(username, password);

    switch (reply) {
      //true
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

          <LabelButton label="Login" onClick={handleOnClickLogin} />
        </div>
      </div>
    </>,
    document.body
  );

  // return (
  //   <div onClick={handleDisableView}>
  //     <h1>Login Page</h1>
  //     <TextBox placeholder="Username" cssProps="" onChange={(value) => setUsername(value)} />
  //     <TextBox placeholder="Password" cssProps="" onChange={(value) => setPassword(value)} />
  //     <LabelButton label="Login" onClick={handleOnClickLogin} />
  //     <LabelButton label="Register" onClick={() => navgiate("/register")} />
  //   </div>
  // );
};
