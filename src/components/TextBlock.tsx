import "./TextBlock.css";

interface TextBlockProps {
  text: string;
  side: "left" | "right";
}

export const TextBlock = ({ text, side }: TextBlockProps) => {
  return (
    <div className={"textBlock " + side}>
      <p>{text}</p>
    </div>
  );
};
