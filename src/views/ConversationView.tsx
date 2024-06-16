import LabelButton from "./../components/LabelButton";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { NewChatPortalView } from "../views/NewChatView";

import {
  ApiStringArrayResponse,
  ApiMessageArrayResponse,
  LoadChatRequest,
  RetrieveConversationTitlesRequest,
  ApiMessage,
} from "../api/NetworkCommands";

import "./ConversationView.css";
import { TextContainer } from "../components/TextContainer";
import TextBox from "../components/TextBox";

interface UserProps {
  username: string;
}

export const ConversationView = ({ username }: UserProps) => {
  const navgiate = useNavigate();

  const [title, setTitle] = useState("");
  const [model, setModel] = useState("");

  const [titles, setTitles] = useState<string[]>();
  const [messages, setMessages] = useState<ApiMessage[]>();

  useEffect(() => {
    const handleInitialization = async () => {
      console.log("Entered Conversation View");
      const reply: ApiStringArrayResponse = await RetrieveConversationTitlesRequest(username);
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

  const handleTopicSelcted = (username: string, titleName: string) => {
    console.log("Selected a conversation:", titleName);
    const handleRetrieveMessages = async () => {
      const reply = await LoadChatRequest(username, titleName);
      console.log(reply.Messages[0].Content);
      setMessages(reply.Messages);
    };
    handleRetrieveMessages();
  };

  return (
    <div className="conversationPageLayout">
      <div className="conversationTopicsDisplayLayout">
        {titles ? (
          titles.map((titleName, index) => (
            <LabelButton
              label={titleName}
              onClick={() => handleTopicSelcted(username, titleName)}
              cssProps="conversationTopicButtons"
            />
          ))
        ) : (
          <p> Loading Titles... </p>
        )}
      </div>
      <div className="conversationMainChatLayout">
        <h1>Conversation Page</h1>

        {messages && <TextContainer conversation={messages} />}

        {visible && <NewChatPortalView handleOnClick={handleOnClick} />}
        {<TextBox cssProps="conversationTextBox"/>}
        
        <LabelButton label="Create Conversation" onClick={handleCreateConversionClick} />
        <LabelButton label="Logout" onClick={() => navgiate("/logout")} />
      </div>
    </div>
  );
};
