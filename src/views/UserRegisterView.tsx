import { useState } from "react";

import TextBox from "./../components/TextBox";
import LabelButton from "./../components/LabelButton";
import { useNavigate } from "react-router-dom";
import "./UserRegisterView.css";
import ReactDOM from "react-dom";
import { ApiResponse, RegisterRequest } from "../api/ServerAccessApi";

interface changeViewProps {
  changeView: (newView: string) => void;
}

export const UserRegisterView = () => {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const handleRegister = () => {
    // checks if register successful
    if (password !== confirmPassword) {
      // set a error message
      alert("Passwords do not match!");
      return;
    }

    const RunLogic = async () => {
      const reply: ApiResponse = await RegisterRequest(username, password);

      switch (reply.response) {
        //true
        case "success": {
          navigate("/conversations");

          break;
        }
        case "failure": {
          alert("Failed to register, Username exists!");
          break;
        }
      }
    };
  };

  // To prevent clicks on the View within the Login page
  // to navigate back to the Home View
  const portalOnClick = (e: React.MouseEvent<HTMLDivElement>) => {
    e.stopPropagation();
  };

  return ReactDOM.createPortal(
    <>
      <div>
        <h1>Register Account</h1>
        <TextBox placeholder="Username" cssProps="textBox" onChange={(value) => setUsername(value)} />
        <TextBox placeholder="Password" cssProps="textBox" onChange={(value) => setPassword(value)} />
        <TextBox placeholder="Confirm Password" cssProps="textBox" onChange={(value) => setConfirmPassword(value)} />
        <LabelButton label="Register" onClick={handleRegister} />
      </div>
    </>,
    document.body
  );
};
