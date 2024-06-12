import LabelButton from "./../components/LabelButton";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

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

  return (
    <div>
      <h1>Conversation Page</h1>

      <LabelButton
        label="Create Conversation"
        onClick={() => navgiate("/new_chat")}
      />
      <LabelButton label="Logout" onClick={() => navgiate("/logout")} />
    </div>
  );
};
