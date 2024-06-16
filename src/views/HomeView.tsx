import { useState } from "react";
import { useNavigate } from "react-router-dom";
import LabelButton from "./../components/LabelButton";
import { UserLoginView } from "./UserLoginView";

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

  // To Do: Register View Still Needs To Be Refactored
  return (
    <div>
      <h1>Local LLM</h1>
      {loginVisible && <UserLoginView setDisableView={handleDisableLogin} setUsernameCallback={setUsernameCallback} />}
      <LabelButton label="Login" onClick={handleEnableLogin} />

      {registerVisible && <UserLoginView setDisableView={handleDisableRegister} setUsernameCallback={setUsernameCallback} />}
      <LabelButton label="Register" onClick={handleEnableRegister} />
    </div>
  );
};
