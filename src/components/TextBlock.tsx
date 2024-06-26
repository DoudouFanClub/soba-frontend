import { marked } from "marked";

import "./TextBlock.css";
import "highlight.js/styles/vs2015.min.css";

// Component Props
interface TextBlockProps {
  // Text to be Rendered - Managed by TextContainer (Mini View)
  text: string;
  // Left = "assistant" | Right = "user"
  side: "left" | "right";
}

// TextBlock Component - Displayed within ConversationView
// Supports Markdown Format & Highlighting of Languages
export const TextBlock = ({ text, side }: TextBlockProps) => {
  return (
    <div className={"textBlock " + side}>
      {/*
        Renders the Left Code Block (Response) with
        Markdown Format & Highlighting
      */}
      {side === "left" && (
        <div>
          <div className="markdown-preview">
            <p style={{ fontWeight: "bold" }}>LLM Response: </p>
            <div dangerouslySetInnerHTML={{ __html: marked(text) }} />
          </div>
        </div>
      )}
      {/*
        Renders the Right Code Block (User Prompt) with
        no formatting
      */}
      {side === "right" && <p>{text}</p>}
    </div>
  );
};
