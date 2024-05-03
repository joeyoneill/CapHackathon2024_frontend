// imports
import React, {
  useState,
  useEffect,
} from "react";
import NewBottomBar from "./NewBottomBar";
import ChatSplash from "./ChatSplash";


// Main Component
function NewChatCard({
    aiHistory,
    userHistory,
}) {

    const [isEmpty, setIsEmpty] = useState(true);

    useEffect(() => {
      // Check if aiHistory and userHistory are empty and update isEmpty state
      setIsEmpty(aiHistory.length === 0 && userHistory.length === 0);
  }, [aiHistory, userHistory]); // Watch for changes in aiHistory and userHistory arrays

    return (
        <div className="flex flex-col h-[100vh] w-[80vw]">

            {/* Header */}
            <div>
                <h1 className="text-center pt-4">Capgemin.ai</h1>
                <div className="divider"/>
            </div>

            {/* Chat Area */}
            {isEmpty ? ( // Conditionally render ChatSplash if isEmpty is true
                <ChatSplash />
            ) : (
                <div className="overflow-auto">
                    {userHistory.map((message, index) => (
                        <div key={index} className="">
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
            )}
            
            {/* Bottom Bar */}
            <div className="mt-auto">
                <NewBottomBar />
            </div>
        </div>
    );
}

export default NewChatCard;
