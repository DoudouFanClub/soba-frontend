import LabelButton from "./../components/LabelButton";
import { useNavigate } from "react-router-dom";
import { useEffect, useRef, useState } from "react";
import { NewChatPortalView } from "../views/NewChatView";

import "./ConversationView.css";
import { TextContainer } from "../components/TextContainer";
import TextBox from "../components/TextBox";
import { Scrollbar } from "../components/Scrollbar";
import { ApiMessage, ApiStringArrayResponse, LoadChatRequest, RetrieveConversationTitlesRequest, HandleSendMessage } from "../api/ServerActionApi";

interface UserProps {
  username: string;
}

export const ConversationView = ({ username }: UserProps) => {
  const navgiate = useNavigate();

  const [title, setTitle] = useState("");
  const [model, setModel] = useState("");
  const [prompt, setPrompt] = useState("");

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
    // To Do: Post to backend to create chat and update the main page
    isVisible(false);
  };

  const handleCreateConversionClick = () => {
    isVisible(true);
  };

  const createChatBubble = () => {

  };

  // To enable conversation view to begin from the bottom
  // each time messages[] is modified
  // (E.g. On User Prompt / On LLM Complete Response)
  const scrollRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

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
    <div className="overviewPageLayout">
      <div className="leftViewLayout">
        {titles && <Scrollbar placeholder="Loading Titles..." username={username} values={titles} onSelect={handleTopicSelcted} />}
      </div>
      <div className="rightViewLayout">
        <div className="conversationTextBlockLayout" ref={scrollRef}>
          <h1>Conversation Page</h1>
          {messages && <TextContainer conversation={messages} />}
          <LabelButton label="Create Conversation" onClick={handleCreateConversionClick} />
          <LabelButton label="Logout" onClick={() => navgiate("/logout")} />
        </div>

        {visible && <NewChatPortalView handleOnClick={handleOnClick} />}

        <div className="conversationUserPromptLayout">
          <TextBox cssProps="conversationTextBox" onChange={(value) => setPrompt(value)}/>
          <LabelButton label="Send" onClick={HandleSendMessage(prompt, createChatBubble)} />
        </div>
      </div>
    </div>
  );
};
