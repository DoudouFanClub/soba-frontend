import { useState } from "react";

import TextBox from "./../components/TextBox";
import DropdownBox from "./../components/Dropdown";
import LabelButton from "./../components/LabelButton";
import { LoginRequest } from "./../api/NetworkCommands";
import { useNavigate } from "react-router-dom";

interface SetUsernameCallback {
  setUsernameCallback: (username: string) => void;
}

export const UserLogoutView = ({ setUsernameCallback }: SetUsernameCallback) => {
  const navigate = useNavigate();

  const [title, setTitle] = useState("");
  const [model, setModel] = useState("");

  const handleLogout = () => {
    setUsernameCallback("logout");
    navigate("/");
  };

  return (
    <div>
      <h1>Logout</h1>

      <TextBox placeholder="Title" onChange={(value) => setTitle(value)} />

      <LabelButton label="Back to login" onClick={handleLogout} />
    </div>
  );
};
