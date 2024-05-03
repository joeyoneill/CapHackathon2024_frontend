// imports
import React, { useState, useEffect, useRef } from "react";
import NewBottomBar from "./NewBottomBar";
import ChatSplash from "./ChatSplash";

// Main Component
function NewChatCard({
    aiHistory,
    userHistory,
    userInput,
    aiResponse,
    setUserInput,
}) {
    return (
        <div className="flex flex-col h-[100vh] w-[80vw]">

            {/* Header */}
            <div>
                <h1 className="text-center pt-4">Capgemin.ai</h1>
                <div className="divider"/>
            </div>

            {/* Chat Area */}
            <div className="overflow-auto">
                {userHistory.map((message, index) => (
                    <div className="">
                        <div className="chat chat-end">
                            <div className="chat-bubble chat-bubble-success">
                                {message}
                            </div>
                        </div>
                        <div className="chat chat-start">
                            <div className="chat-bubble bg-capVibrantBlue text-white">
                                {aiHistory[index]}
                            </div>
                        </div>
                    </div>
                ))}
            </div>
            
            {/* Bottom Bar */}
            <div className="mt-auto">
                <NewBottomBar
                    setUserInput={setUserInput}
                    userInput={userInput}
                />
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
