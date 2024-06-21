import { useState } from "react";

import TextBox from "./../components/TextBox";
import LabelButton from "./../components/LabelButton";
import { useLocation, useNavigate } from "react-router-dom";
import { LogoutRequest } from "../api/ServerAccessApi";

interface SetUsernameCallback {
  setUsernameCallback: (username: string) => void;
}

export const UserLogoutView = ({ setUsernameCallback }: SetUsernameCallback) => {
  const navigate = useNavigate();
  const location = useLocation();
  const { username, title } = location.state;

  const handleLogout = async () => {
    await LogoutRequest(username, title);
    setUsernameCallback("logout");
    navigate("/");
  };

  // To prevent clicks on the View within the Logout view
  // to navigate back to the Conversation View
  const portalOnClick = (e: React.MouseEvent<HTMLDivElement>) => {
    e.stopPropagation();
  };

  return (
    <div>
      <h1>Logout</h1>
      <LabelButton label="Back to login" onClick={handleLogout} />
    </div>
  );
};
