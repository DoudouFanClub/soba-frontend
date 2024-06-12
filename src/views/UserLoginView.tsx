import { useEffect, useState } from "react";

import TextBox from "./../components/TextBox";
import LabelButton from "./../components/LabelButton";
import { LoginRequest } from "./../api/NetworkCommands";
import { useNavigate } from "react-router-dom";

interface SetUsernameCallback {
  setUsernameCallback: (username: string) => void;
}

export const UserLoginView = ({ setUsernameCallback }: SetUsernameCallback) => {
  const navgiate = useNavigate();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

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

  return (
    <div>
      <h1>Login Page</h1>
      <TextBox
        placeholder="Username"
        onChange={(value) => setUsername(value)}
      />
      <TextBox
        placeholder="Password"
        onChange={(value) => setPassword(value)}
      />
      <LabelButton label="Login" onClick={handleOnClickLogin} />
      <LabelButton label="Register" onClick={() => navgiate("/register")} />
    </div>
  );
};
