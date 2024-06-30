// src/App.tsx
import { BrowserRouter, Routes, Route } from "react-router-dom";

import { HomeView } from "./views/HomeView";
import { UserLogoutView } from "./views/UserLogoutView";
import { ConversationView } from "./views/ConversationView";

import "./App.css";

function App() {
  // Change the views tomorrow
  return (
    <BrowserRouter>
      <div>
        <Routes>
          <Route path="/" element={<HomeView />} />
          <Route path="/conversations" element={<ConversationView />} />
          <Route path="/logout" element={<UserLogoutView />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
