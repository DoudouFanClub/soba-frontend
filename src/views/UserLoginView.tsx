import { useEffect, useState } from "react";

import TextBox from "./../components/TextBox";
import LabelButton from "./../components/LabelButton";
import { LoginRequest } from "./../api/NetworkCommands";
import { useNavigate } from "react-router-dom";
import ReactDOM from "react-dom";
import "./UserLoginView.css";

interface usernameCallbackProp {
  setUsernameCallback: (username: string) => void;
  setDisableView: () => void;
}

export const UserLoginView = ({ setUsernameCallback, setDisableView }: usernameCallbackProp) => {
  const navgiate = useNavigate();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleDisableView = () => {
    setDisableView();
  };
  const handleOnClickLogin = () => {
    // if Pass
    setUsernameCallback(username);

    // need to call POST request later

    // if Failed

    // View navigation
    navgiate("/conversations");
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
          <h1 className="headerTitle">Register Account</h1>
          <TextBox placeholder="Username" cssProps="usernameTextBoxStyle" onChange={(value) => setUsername(value)} />
          <TextBox placeholder="Password" cssProps="passwordTextBoxStyle" onChange={(value) => setPassword(value)} />

          {/* <LabelButton label="Register" onClick={handleRegister} /> */}
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
