import LabelButton from "./../components/LabelButton";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { NewChatPortalView } from "../views/NewChatView";

import { ApiUserTitlesResponse, RetrieveConversationTitlesRequest } from "../api/NetworkCommands";

import "./ConversationView.css";

interface UserProps {
  username: string;
}

export const ConversationView = ({ username }: UserProps) => {
  const navgiate = useNavigate();

  const [title, setTitle] = useState("");
  const [model, setModel] = useState("");

  const [titles, setTitles] = useState<string[]>();

  useEffect(() => {
    const handleInitialization = async () => {
      console.log("Entered Conversation View");
      const reply: ApiUserTitlesResponse = await RetrieveConversationTitlesRequest(username);
      setTitles(reply.response);
    };

    handleInitialization();
    console.log("Title updated:", titles);
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

  const handleOnClickasd = () => {};

  return (
    <div style={{ display: "flex", padding: "0px", margin: "0px", border: "0px" }}>
      <div
        style={{
          position: "absolute",
          border: "0px",
          top: "5%",
          left: "0%",
          height: "100%",
          width: "350px",
          overflow: "scroll",
          overflowX: "hidden",
        }}
      >
        {titles ? (
          titles.map((value, index) => <LabelButton label={value} onClick={handleOnClickasd} cssProps="conversationTopicButtons" />)
        ) : (
          <p> Loading Titles... </p>
        )}
      </div>
      <div>
        <h1>Conversation Page</h1>

        {visible && <NewChatPortalView handleOnClick={handleOnClick} />}
        <LabelButton label="Create Conversation" onClick={handleCreateConversionClick} />
        <LabelButton label="Logout" onClick={() => navgiate("/logout")} />
      </div>
    </div>
  );
};
