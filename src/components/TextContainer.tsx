import { ApiMessage } from "../api/ServerActionApi";
import { TextBlock } from "./TextBlock";

import "./TextContainer.css";

// Component Props
interface TextContainerProps {
  // List of all Messages within a Conversation
  conversation: ApiMessage[];
}

// Text Container Component - Renders Text Blocks on
// the Left or Right within a Div
export const TextContainer = ({ conversation }: TextContainerProps) => {
  return (
    <div className="textContainer">
      {/*
        Goes through all Messages within ApiMessage
        and displays them on the Left or Right based
        on their Index
      */}
      {conversation.map((text, index) => (
        <TextBlock key={index} text={text.Content} side={index % 2 === 1 ? "left" : "right"} />
      ))}
    </div>
  );
};
