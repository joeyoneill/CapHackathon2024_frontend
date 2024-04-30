import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getConversationHistory } from "../store/auth/AuthSlice";
import { selectCurrentAuthToken } from "../store/auth/AuthSlice";
import ConversationHistory from "../components/ConversationHistory";
import Chat from "../components/Chat";
import Loader from "../components/Loader";

function ChatPage() {
  const dispatch = useDispatch();
  const token = useSelector(selectCurrentAuthToken);

  const [isHistoryOpen, setIsHistoryOpen] = useState(true);
  const [conversations, setConversations] = useState([]);
  const [loading, setLoading] = useState(false);

  // load the previous conversations when the component mounts
  useEffect(() => {
    if (token) {
      dispatch(getConversationHistory({ authToken: token }));
    }
  }, [token, dispatch]);

  const toggleHistory = () => {
    setIsHistoryOpen(!isHistoryOpen);
  };

  return (
    <div className={"flex flex-row"}>
      {/* <div className="w-1/5 h-screen bg-slate-100">
        <ConversationHistory />
      </div> */}

      {/* Sidebar for conversation history */}
      <div
        className={`w-full md:w-1/5 bg-slate-100 md:static md:h-screen md:flex-shrink-0 md:flex-grow-0 md:overflow-y-auto transition-all duration-300 ${
          isHistoryOpen
            ? "md:w-1/4"
            : "sm:invisible md:w-0 md:flex-grow-0 md:flex-shrink"
        }`}
      >
        <button
          className="absolute top-0 right-0 px-4 py-2 md:hidden"
          onClick={toggleHistory}
        >
          Toggle
        </button>

        <div
          className={`md:flex md:flex-col md:h-full ${
            isHistoryOpen ? "flex" : "hidden"
          }`}
        >
          <div className="bg-slate-100 md:flex-grow-1">
            {isHistoryOpen && <ConversationHistory />}
          </div>
        </div>
      </div>

      {/* main chat area */}
      <div className="w-4/5 mx-5">
        <Chat />
      </div>
    </div>
  );
}

export default ChatPage;
