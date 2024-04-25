import React, { useState } from "react";
import { FaCircleArrowUp } from "react-icons/fa6";
import MessageBubble from "./MessageBubble";
import UserMessageBubble from "./UserMessageBubble";

function Chat() {
  // state to hold the input value
  const [input, setInput] = useState("");
  // state to tell if there's text in the input field
  const [textEntered, setTextEntered] = useState("false");

  // useEffect(() => {
  //   if (token) {
  //     dispatch(getConversationHistory({ authToken: token }));
  //     console.log('Conversations got from api');
  //   }
  // }, [token, dispatch])

  const handleChange = (e) => {
    setInput(e.target.value);
    setTextEntered(e.target.value.length > 0);
  };

  return (
    <div className="flex flex-col h-screen w-full">
      {/* header */}
      <div className="h-10 mt-3">
        Hackathon GPT
      </div>

      {/* message history */}
      <div className='flex flex-col space-y-4 overflow-y-auto mb-4'>
        <MessageBubble />
        <MessageBubble />
        <UserMessageBubble />
        <MessageBubble />
        <UserMessageBubble />
        <UserMessageBubble />
        <UserMessageBubble />
        <UserMessageBubble />
        <MessageBubble />
        <MessageBubble />
        <MessageBubble />

      </div>


      {/* chat input */}
      <div className="mt-auto w-full sm:w-3/5 flex justify-center items-center self-center mb-6 relative">
        <input
          type="text"
          className="bg-white border border-slate-300 rounded-lg py-2 px-4 w-full focus:outline-none focus:ring focus:ring-slate-200 pr-10"
          placeholder="Message GPT..."
          value={input}
          onChange={handleChange}
        />
        <span
          className={`absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none ${
            textEntered ? "text-black" : "text-gray-400"
          }`}
        >
          <FaCircleArrowUp className="h-5 w-5" />
        </span>
      </div>
    </div>
  );
}

export default Chat;
