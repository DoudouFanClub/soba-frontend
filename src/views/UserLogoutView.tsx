import { useLocation, useNavigate } from "react-router-dom";

import LabelButton from "./../components/LabelButton";
import { LogoutRequest } from "../api/ServerAccessApi";

// Handle click inside the portal (prevent backward propagation)
const disableBackwardPropagation = (e: React.MouseEvent<HTMLDivElement>) => {
  e.stopPropagation();
};

export const UserLogoutView = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { username, title } = location.state;

  // Notifies the backend to save the current chat
  const handleLogout = async () => {
    await LogoutRequest(username, title);
    navigate("/");
  };

  return (
    <div>
      <h1>Logout</h1>
      {/* Logout Button */}
      <LabelButton label="Back to login" onClick={handleLogout} />
    </div>
  );
};
