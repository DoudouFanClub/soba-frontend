import { useEffect, useRef, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { marked, Tokens } from "marked";
import hljs from "highlight.js";

import LabelButton from "./../components/LabelButton";
import { NewChatPortalView } from "../views/NewChatView";
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

// Initialize Markdown.js
const handleInitializeRenderer = () => {
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
      breaks: true, // Enable line breaks
    });
  }, []);
};

// Fetch conversation titles for user
const handleFetchConversationTitles = (username: string, title: string, setTitles: (titles: string[]) => void) => {
  useEffect(() => {
    const fetchTitles = async () => {
      const reply: ApiStringArrayResponse = await RetrieveConversationTitlesRequest(username);
      setTitles(reply.response);
    };

    fetchTitles();
  }, [username, title, setTitles]);
};

// Automatically scroll to the bottom of the container when dependencies change
const handleAutoScrollToBottom = (ref: React.RefObject<HTMLDivElement>, dependency: any) => {
  useEffect(() => {
    if (ref.current) {
      ref.current.scrollTop = ref.current.scrollHeight;
    }
  }, [dependency, ref]);
};

export const ConversationView = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { username } = location.state; // Retrieve username from location state

  // State variables
  const [title, setTitle] = useState("");
  const [model, setModel] = useState("");
  const [prompt, setPrompt] = useState("");
  const [textAreaLock, setTextAreaLock] = useState(false);
  const [titles, setTitles] = useState<string[]>();
  const [messages, setMessages] = useState<ApiMessage[]>([]);
  const [visible, setVisible] = useState(false);

  const scrollRef = useRef<HTMLDivElement>(null); // Reference for scrolling

  // Initialize renderer and fetch conversation titles on mount
  handleInitializeRenderer();
  handleFetchConversationTitles(username, title, setTitles);
  handleAutoScrollToBottom(scrollRef, messages); // Auto-scroll to bottom on messages change

  // Handle closing the new chat portal
  const handleOnClick = () => {
    setVisible(false);
  };

  // Handle opening the new chat portal
  const handleCreateConversationClick = () => {
    setVisible(true);
  };

  // Handle selecting a conversation topic
  const handleTopicSelected = (username: string, titleName: string) => {
    const fetchMessages = async () => {
      const reply: ApiLoadChatResponse = await LoadChatRequest(username, titleName);
      setMessages(reply.response.Messages);
    };

    setTitle(titleName);
    fetchMessages();
  };

  // Handle user input in the text area and send a message
  const onUserEnterInTextArea = async () => {
    setTextAreaLock(true);
    // Currently we update messages by inserting prompt AFTER entering
    // the function, making use of arrays being passed by reference in TS
    // We may want to consider finding a way to update messages to trigger
    // handleAutoScrollToBottom
    await HandleSendMessage(username, title, prompt, messages)();
    setTextAreaLock(false);
  };

  return (
    <div className="overviewPageLayout">
      <div className="leftViewLayout">
        <div className="leftOptionsLayout">
          {/* Button to create a new conversation */}
          <LabelButton label="Create Conversation" onClick={handleCreateConversationClick} />
          {/* Button to logout */}
          <LabelButton label="Logout" onClick={() => navigate("/logout", { state: { username, title } })} />
        </div>

        {/* Scrollbar to display conversation titles */}
        {titles && <Scrollbar placeholder="Loading Titles..." username={username} values={titles} onSelect={handleTopicSelected} />}
      </div>
      <div className="rightViewLayout">
        <div className="conversationTextBlockLayout" ref={scrollRef}>
          <h1>Conversation Page</h1>
          {/* Container to display conversation messages */}
          {messages && <TextContainer conversation={messages} />}
        </div>

        {/* New chat portal view */}
        {visible && (
          <NewChatPortalView username={username} handleClosePortal={handleOnClick} handleOnNewChatCreated={handleTopicSelected} />
        )}

        <div className="conversationUserPromptLayout">
          {/* Text area for user input, also allows for "Enter" to send the message */}
          <TextArea
            cssProps="conversationTextBox"
            onChange={(value) => setPrompt(value)}
            placeholder="Ask anything..."
            onEnterDown={onUserEnterInTextArea}
            isLocked={textAreaLock}
          />
          {/* Button to send the message */}
          <LabelButton cssProps="conversationSendButton" label="Send" onClick={onUserEnterInTextArea} disabled={textAreaLock} />
        </div>
      </div>
    </div>
  );
};

export default ConversationView;
