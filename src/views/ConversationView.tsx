import { TextareaHTMLAttributes, useEffect, useRef, useState } from "react";
import LabelButton from "./../components/LabelButton";
import { NewChatPortalView } from "../views/NewChatView";
import { useLocation, useNavigate } from "react-router-dom";
import { Tokens, marked } from "marked";
import hljs from "highlight.js";

import { TextArea } from "../components/TextArea";
import { Scrollbar } from "../components/Scrollbar";
import { TextContainer } from "../components/TextContainer";
import {
  ApiMessage,
  ApiStringArrayResponse,
  LoadChatRequest,
  RetrieveConversationTitlesRequest,
  HandleSendMessage,
  ApiLoadChatResponse,
} from "../api/ServerActionApi";

import "./ConversationView.css";

export const ConversationView = () => {
  const navgiate = useNavigate();

  const [title, setTitle] = useState("");
  const [model, setModel] = useState("");
  const [prompt, setPrompt] = useState("");
  const [textAreaLock, setTextAreaLock] = useState(false);

  const [titles, setTitles] = useState<string[]>();
  const [messages, setMessages] = useState<ApiMessage[]>([]);

  const location = useLocation();
  const { username } = location.state;

  useEffect(() => {
    const handleInitialization = async () => {
      console.log("Entered Conversation View");
      const reply: ApiStringArrayResponse = await RetrieveConversationTitlesRequest(username);
      setTitles(reply.response);
    };

    handleInitialization();
    console.log("Location test: ", username);
    console.log("Username: ", username);
    console.log("Title updated:", titles);
  }, [title]);

  // Used to initialize Renderer to parse
  useEffect(() => {
    const renderer = new marked.Renderer();

    renderer.code = ({ text, lang, escaped }: Tokens.Code) => {
      if (lang) {
        const validLanguage = hljs.getLanguage(lang) ? lang : "plaintext";
        const highlighted = hljs.highlight(validLanguage, text).value;
        return `<pre class="markdown-preview"><code class="hljs ${validLanguage}">${highlighted}</code></pre>`;
      }
      return "";
    };

    marked.setOptions({
      renderer,
      breaks: true, // Enables GitHub flavored markdown line breaks
    });
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
    const handleRetrieveMessages = async () => {
      const reply: ApiLoadChatResponse = await LoadChatRequest(username, titleName);
      console.log("chicken nugget: ", reply.response.Messages.length > 0 && reply.response.Messages[0].Content);
      setMessages(reply.response.Messages);
    };

    setTitle(titleName);
    handleRetrieveMessages();
  };

  const onUserEnterInTextArea = async () => {
    setTextAreaLock(true);
    await HandleSendMessage(username, title, prompt, messages)();
    setTextAreaLock(false);
  };

  return (
    <div className="overviewPageLayout">
      <div className="leftViewLayout">
        <div className="leftOptionsLayout">
          <LabelButton label="Create Conversation" onClick={handleCreateConversionClick} />
          <LabelButton label="Logout" onClick={() => navgiate("/logout", { state: { username: `${username}`, title: `${title}` } })} />
        </div>

        {titles && <Scrollbar placeholder="Loading Titles..." username={username} values={titles} onSelect={handleTopicSelcted} />}
      </div>
      <div className="rightViewLayout">
        <div className="conversationTextBlockLayout" ref={scrollRef}>
          <h1>Conversation Page</h1>
          {messages && <TextContainer conversation={messages} />}
        </div>

        {visible && <NewChatPortalView username={username} handleClosePortal={handleOnClick} handleOnNewChatCreated={handleTopicSelcted} />}

        <div className="conversationUserPromptLayout">
          <TextArea
            cssProps="conversationTextBox"
            onChange={(value) => setPrompt(value)}
            placeholder="Ask anything..."
            onEnterDown={onUserEnterInTextArea}
            isLocked={textAreaLock}
          />
          <LabelButton cssProps="conversationSendButton" label="Send" onClick={onUserEnterInTextArea} />
        </div>
      </div>
    </div>
  );
};
