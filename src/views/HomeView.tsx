import { useState } from "react";
import { useNavigate } from "react-router-dom";
import LabelButton from "./../components/LabelButton";
import { UserLoginView } from "./UserLoginView";
import { UserRegisterView } from "./UserRegisterView";

interface usernameCallbackProp {
  setUsernameCallback: (username: string) => void;
}

export const HomeView = ({ setUsernameCallback }: usernameCallbackProp) => {
  // Toggle Login portal visibility
  const [loginVisible, isLoginVisible] = useState(false);
  const handleDisableLogin = () => {
    isLoginVisible(false);
  };

  const handleEnableLogin = () => {
    isLoginVisible(true);
  };

  // Toggle Register portal visibility
  const [registerVisible, setRegisterVisible] = useState(false);
  const handleDisableRegister = () => {
    setRegisterVisible(false);
  };

  const handleEnableRegister = () => {
    setRegisterVisible(true);
  };

  return (
    <div>
      <h1>Local LLM</h1>
      {loginVisible && <UserLoginView setDisableView={handleDisableLogin} />}
      <LabelButton label="Login" onClick={handleEnableLogin} />

      {registerVisible && <UserRegisterView setDisableView={handleDisableRegister} />}
      <LabelButton label="Register" onClick={handleEnableRegister} />
    </div>
  );
};
