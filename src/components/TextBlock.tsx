import { marked } from "marked";
import "./TextBlock.css";

import "highlight.js/styles/vs2015.min.css";

interface TextBlockProps {
  text: string;
  side: "left" | "right";
}

export const TextBlock = ({ text, side }: TextBlockProps) => {
  return (
    <div className={"textBlock " + side}>
      {side === "left" && (
        <div>
          <div className="markdown-preview">
            <div dangerouslySetInnerHTML={{ __html: marked(text) }} />
          </div>
        </div>
      )}
      {side === "right" && <p>{text}</p>}
    </div>
  );
};
