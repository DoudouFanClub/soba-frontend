import "./TextBlock.css";

interface TextBlockProps {
  text: string;
  side: "left" | "right";
}

export const TextBlock = ({ text, side }: TextBlockProps) => {
  return (
    <div className={"textBlock " + side}>
      {side === "left" && (
        <div>
          <p style={{ fontStyle: "italic", fontWeight: "bold" }}>Local LLM </p>
          <p>{text}</p>
        </div>
      )}
      {side === "right" && <p>{text}</p>}
    </div>
  );
};
