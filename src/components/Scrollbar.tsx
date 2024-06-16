import LabelButton from "./LabelButton";

interface ScrollbarProps {
  placeholder: string;
  username: string;
  values: string[];
  onSelect: (username: string, title: string) => void;
}

export const Scrollbar = ({ placeholder, username, values, onSelect }: ScrollbarProps) => {
  return (
    <div>
      {values ? (
        values.map((titleName, index) => (
          <LabelButton
            label={titleName}
            onClick={() => onSelect(username, titleName)}
            cssProps="conversationTopicButtons"
          />
        ))
      ) : (
        <p>{placeholder}</p>
      )}
    </div>
  );
};
