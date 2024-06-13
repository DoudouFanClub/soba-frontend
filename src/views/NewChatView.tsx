// import { useState } from "react";

// import TextBox from "./../components/TextBox";
// import DropdownBox from "./../components/Dropdown";
// import LabelButton from "./../components/LabelButton";
// import { useNavigate } from "react-router-dom";

// interface UserProps {
//   username: string;
// }

// export const NewChatView = ({ username }: UserProps) => {
//   const navgiate = useNavigate();

//   const [title, setTitle] = useState("");
//   const [model, setModel] = useState("");

//   return (
//     <div>
//       <h1>Create New Conversation</h1>

//       <TextBox placeholder="Title" onChange={(value) => setTitle(value)} />

//       <DropdownBox
//         placeholder="LLAMA"
//         options={["Llama", "Chicken"]}
//         handleModelSelect={setModel}
//       />

//       <LabelButton
//         label="Create Conversation"
//         onClick={() => navgiate("/conversations")}
//       />
//     </div>
//   );
// };

import { useState } from "react";
import ReactDOM from "react-dom";
import LabelButton from "../components/LabelButton";

import "./NewChatView.css";
import TextBox from "../components/TextBox";
import DropdownBox from "../components/Dropdown";

interface PortalWindowProp {
  handleOnClick: () => void;
}

export function NewChatPortalView({ handleOnClick }: PortalWindowProp) {
  const [title, setTitle] = useState("");
  const [model, setModel] = useState("");

  const portalOnClick = (e: React.MouseEvent<HTMLDivElement>) => {
    e.stopPropagation();
  };

  return ReactDOM.createPortal(
    <>
      <div className="createConversationHiddenOverlay" onClick={handleOnClick}>
        <div className="createConversationPanel" onClick={portalOnClick}>
          <h1 className="headerTitle">Create a New Chat</h1>
          <TextBox placeholder="Title" onChange={setTitle} cssProps="titleTextBoxStyle" />
          <DropdownBox
            placeholder="Boulder Planet"
            options={["Boulder Planet", "Boulder Movement", "BFF", "Boulder Plus"]}
            handleModelSelect={setModel}
            cssProps="modelDropdownBoxStyle"
          />
          {/* <LabelButton label="X" onClick={handleOnClick} cssProps="closeButtonStyle" /> */}
          <LabelButton label="Confirm" onClick={handleOnClick} cssProps="confirmButtonStyle" />
        </div>
      </div>
    </>,
    document.body
  );
}
