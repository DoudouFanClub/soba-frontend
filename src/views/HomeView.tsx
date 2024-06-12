import { useState } from "react";
import { useNavigate } from "react-router-dom";
import LabelButton from "./../components/LabelButton";

export const HomeView = () => {
  const navgiate = useNavigate();

  return (
    <div>
      <h1>Local LLM</h1>
      <LabelButton label="Login" onClick={() => navgiate("/login")} />
      <LabelButton label="Register" onClick={() => navgiate("/register")} />
    </div>
  );
};
