import { useState } from "react";

import TextBox from "./../components/TextBox";
import LabelButton from "./../components/LabelButton";
import { RegisterRequest, ApiResponse } from "./../api/NetworkCommands";
import { useNavigate } from "react-router-dom";

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
          //const reply: ApiResponse = await RegisterRequest(username, password);
          navigate("/conversations");

          break;
        }

        case "failure": {
          alert("Failed to register, Username exists!");
          break;
        }
      }
    };

    RunLogic();
    // const response : string = await RegisterRequest(username, password);

    // switch (response) {
    //   //true
    //   case "success": {
    //     // retrieve conversations using a get request
    //     navigate("/conversations");

    //     break;
    //   }

    //   case "failure": {
    //     alert("Failed to register, username exists");
    //     break;
    //   }
    // }
  };

  return (
    <div>
      <h1>Register Account</h1>

      <TextBox
        placeholder="Username"
        onChange={(value) => setUsername(value)}
      />

      <TextBox
        placeholder="Password"
        onChange={(value) => setPassword(value)}
      />

      <TextBox
        placeholder="Confirm Password"
        onChange={(value) => setConfirmPassword(value)}
      />

      <p></p>
      <LabelButton label="Register" onClick={handleRegister} />
    </div>
  );
};
