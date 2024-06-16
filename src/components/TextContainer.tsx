import { ApiMessage } from "../api/ServerActionApi";
import { TextBlock } from "./TextBlock";

import "./TextContainer.css";

interface TextContainerProps {
  conversation: ApiMessage[]; // originally str
}

export const TextContainer = ({ conversation }: TextContainerProps) => {
  return (
    <div className="textContainer">
      {conversation.map((text, index) => (
        <TextBlock key={index} text={text.Content} side={index % 2 === 0 ? "left" : "right"} />
      ))}
    </div>
  );
};
