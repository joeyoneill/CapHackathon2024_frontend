import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import Landing from "./pages/Landing";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import ChatPage from "./pages/ChatPage";
import Login from "./pages/Login";

function App() {
  const [count, setCount] = useState(0);

  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/Chat" element={<ChatPage />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
