import { useState } from "react";
import { useNavigate } from "react-router-dom";
import LabelButton from "./../components/LabelButton";
import { UserLoginView } from "./UserLoginView";

interface usernameCallbackProp {
  setUsernameCallback: (username: string) => void;
}

export const HomeView = ({ setUsernameCallback }: usernameCallbackProp) => {
  const navgiate = useNavigate();

  // Toggle Login portal visibility
  const [loginVisible, isLoginVisible] = useState(false);
  const handleDisableLogin = () => {
    //setShowPortal
    isLoginVisible(false);
  };

  const handleEnableLogin = () => {
    isLoginVisible(true);
  };

  // Toggle Register portal visibility
  const [registerVisible, setRegisterVisible] = useState(false);
  const handleDisableRegister = () => {
    //setShowPortal
    setRegisterVisible(false);
  };

  const handleEnableRegister = () => {
    setRegisterVisible(true);
  };

  return (
    <div>
      <h1>Local LLM</h1>
      {loginVisible && <UserLoginView setDisableView={handleDisableLogin} setUsernameCallback={setUsernameCallback} />}
      <LabelButton label="Login" onClick={handleEnableLogin} />
      {/* <LabelButton label="Login" onClick={() => navgiate("/login")} />
      <LabelButton label="Register" onClick={() => navgiate("/register")} /> */}
    </div>
  );
};
