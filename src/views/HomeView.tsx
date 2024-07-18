import { useState } from "react";
import { UserLoginView } from "./UserLoginView";
import { UserRegisterView } from "./UserRegisterView";
import LabelButton from "./../components/LabelButton";

import "./HomeView.css";
import { MenuButton } from "../components/MenuButton";

export const HomeView = () => {
  // State for toggling Login portal visibility
  const [loginVisible, setLoginVisible] = useState(false);

  // State for toggling Register portal visibility
  const [registerVisible, setRegisterVisible] = useState(false);

  // TO DELETE =====
  const HandleButtonClick = (value: string) => {
    switch (value) {
      case "Delete Chat": {
        // toggle portal
        // call api
        break;
      }
      case "Rename Chat": {
        // toggle portal
        // call api
        break;
      }
    }
  };

  return (
    <div className="home-body">
      <h1 className="title-header-body">Soba AI</h1>
      <div className="buttons-body">
        {/* Conditional rendering of UserLoginView */}
        {loginVisible && <UserLoginView setDisableView={() => setLoginVisible(false)} />}
        {/* Button to enable Login view */}
        {!loginVisible && !registerVisible && <LabelButton cssProps="button-props" label="Login" onClick={() => setLoginVisible(true)} />}

        {/* Conditional rendering of UserRegisterView */}
        {registerVisible && <UserRegisterView setDisableView={() => setRegisterVisible(false)} />}
        {/* Button to enable Register view */}
        {!loginVisible && !registerVisible && <LabelButton cssProps="button-props" label="Register" onClick={() => setRegisterVisible(true)} />}
      </div>
    </div>
  );
};
