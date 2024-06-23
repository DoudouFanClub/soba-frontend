import { useState } from "react";
import { UserLoginView } from "./UserLoginView";
import { UserRegisterView } from "./UserRegisterView";
import LabelButton from "./../components/LabelButton";

export const HomeView = () => {
  // State for toggling Login portal visibility
  const [loginVisible, setLoginVisible] = useState(false);

  // State for toggling Register portal visibility
  const [registerVisible, setRegisterVisible] = useState(false);

  return (
    <div>
      <h1>Local LLM</h1>

      {/* Conditional rendering of UserLoginView */}
      {loginVisible && <UserLoginView setDisableView={() => setLoginVisible(false)} />}
      {/* Button to enable Login view */}
      <LabelButton label="Login" onClick={() => setLoginVisible(true)} />

      {/* Conditional rendering of UserRegisterView */}
      {registerVisible && <UserRegisterView setDisableView={() => setRegisterVisible(false)} />}
      {/* Button to enable Register view */}
      <LabelButton label="Register" onClick={() => setRegisterVisible(true)} />
    </div>
  );
};
