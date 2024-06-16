import { useState } from "react";

import TextBox from "./../components/TextBox";
import LabelButton from "./../components/LabelButton";
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

  // To prevent clicks on the View within the Logout view
  // to navigate back to the Conversation View
  const portalOnClick = (e: React.MouseEvent<HTMLDivElement>) => {
    e.stopPropagation();
  };

  return (
    <div>
      <h1>Logout</h1>
      <TextBox placeholder="Title" onChange={(value) => setTitle(value)} />
      <LabelButton label="Back to login" onClick={handleLogout} />
    </div>
  );
};
