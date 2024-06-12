import { useState } from "react";

import TextBox from "./../components/TextBox";
import DropdownBox from "./../components/Dropdown";
import LabelButton from "./../components/LabelButton";
import { useNavigate } from "react-router-dom";

interface UserProps {
  username: string;
}

export const NewChatView = ({ username }: UserProps) => {
  const navgiate = useNavigate();

  const [title, setTitle] = useState("");
  const [model, setModel] = useState("");

  return (
    <div>
      <h1>Create New Conversation</h1>

      <TextBox placeholder="Title" onChange={(value) => setTitle(value)} />

      <DropdownBox
        placeholder="LLAMA"
        options={["Llama", "Chicken"]}
        handleModelSelect={setModel}
      />

      <LabelButton
        label="Create Conversation"
        onClick={() => navgiate("/conversations")}
      />
    </div>
  );
};
