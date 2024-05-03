// imports
import React, { useState, useEffect, useRef } from "react";
import NewBottomBar from "./NewBottomBar";
import ChatSplash from "./ChatSplash";

// Main Component
function NewChatCard({ aiHistory, userHistory }) {
  const [isEmpty, setIsEmpty] = useState(true);
  const messageEndRef = useRef(null);

  useEffect(() => {
    // Check if aiHistory and userHistory are empty and update isEmpty state
    setIsEmpty(aiHistory.length === 0 && userHistory.length === 0);

    // Scroll to the bottom of the messages container
    messageEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [aiHistory, userHistory]); // Watch for changes in aiHistory and userHistory arrays

  // useEffect(() => {
  //   messageEndRef.current?.scrollIntoView({ behavior: "smooth" });
  // }, [aiHistory, userHistory]);

  return (
    <div className="flex flex-col h-[100vh] w-[80vw]">
      {/* Header */}
      <div>
        <h1 className="text-center pt-4">Capgemin.ai</h1>
        <div className="divider" />
      </div>

      {/* Chat Area */}
      {isEmpty ? ( // Conditionally render ChatSplash if isEmpty is true
        <ChatSplash />
      ) : (
        <div className="overflow-auto">
          {userHistory.map((message, index) => (
            <div key={index} className="">
              <div className="chat chat-end">
                <div className="chat-bubble bg-slate-400 text-white text-sm">
                  {message}
                </div>
              </div>
              <div className="chat chat-start">
                <div className="chat-bubble bg-sky-500 text-white text-sm">
                  {aiHistory[index]}
                </div>
              </div>
            </div>
          ))}
          <div ref={messageEndRef} />
        </div>
      )}

      {/* Bottom Bar */}
      <div className="mt-auto">
        <NewBottomBar />
      </div>
    </div>
  );
}

export default NewChatCard;
