import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import Landing from "./pages/Landing";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import ChatPage from "./pages/ChatPage";
import GraphPage from "./pages/GraphPage";
import Login from "./pages/Login";
import RegisterPage from "./pages/RegisterPage";

// New Pages
import NewChatPage from "./pages/NewChatPage";
import NewGraphPage from "./pages/NewGraphPage";

function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/Chat" element={<ChatPage />} />
          <Route path="/Register" element={<RegisterPage />} />
          <Route path="/Graph" element={<GraphPage />} />

          {/* New Routes */}
          <Route path="/NewChat" element={<NewChatPage />} />
          <Route path="/NewGraph" element={<NewGraphPage />} />
          
        </Routes>
      </Router>
    </>
  );
}

export default App;
