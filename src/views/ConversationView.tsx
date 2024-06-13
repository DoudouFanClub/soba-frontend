import LabelButton from "./../components/LabelButton";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { NewChatPortalView } from "../views/NewChatView";

import { RetrieveConversationTitlesRequest } from "../api/NetworkCommands";

interface UserProps {
  username: string;
}

export const ConversationView = ({ username }: UserProps) => {
  const navgiate = useNavigate();

  const [title, setTitle] = useState("");
  const [model, setModel] = useState("");

  const handleInitialization = async () => {
    console.log("Entered Conversation View");
    const titles = await RetrieveConversationTitlesRequest(username);
    console.log(titles);
  };

  useEffect(() => {
    handleInitialization();
  }, []);

  // Toggle portal visibility
  const [visible, isVisible] = useState(false);
  const handleOnClick = () => {
    //setShowPortal
    isVisible(false);
  };

  const handleCreateConversionClick = () => {
    isVisible(true);
  };

  return (
    <div>
      <h1>Conversation Page</h1>

      {visible && <NewChatPortalView handleOnClick={handleOnClick} />}
      <LabelButton label="Create Conversation" onClick={handleCreateConversionClick} />
      <LabelButton label="Logout" onClick={() => navgiate("/logout")} />
    </div>
  );
};
