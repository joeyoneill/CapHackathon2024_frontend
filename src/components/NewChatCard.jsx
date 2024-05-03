import React, { useState } from "react";
import { FaCircleArrowUp } from "react-icons/fa6";
import ChatSplash from "./ChatSplash";

function NewChatCard() {
  const [textEntered, setTextEntered] = useState(false);

  return (
    <div className="min-h-screen flex flex-col justify-between ">

      {/* header of the splash page */}
      <div className="h-1/10">
        <h1 className="text-center pt-4">Capgemin.ai</h1>
        <div className="divider" />
      </div>

      {/* body of the splash page */}
      
      <ChatSplash />

      <div className="mt-auto w-full sm:w-3/5 flex justify-center items-center self-center mb-6 relative space-x-2">
        <input
          type="text"
          className="bg-white border border-slate-300 rounded-lg py-2 px-4 w-full focus:outline-none focus:ring focus:ring-slate-200 pr-10 h-15"
          placeholder="Message GPT..."
          //   value={userInput}
          //   onChange={handleChange}
        />
        <button
          className={`absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none ${
            textEntered ? "text-black" : "text-gray-400"
          }`}
          //   onClick={connectWebSocket}
        >
          {/* <FaCircleArrowUp className="h-5 w-5" /> */}
        </button>
        <button
          className="h-full border border-1 border-slate-300 bg-slate-200 rounded-lg w-16 flex justify-center items-center"
          //   onClick={connectWebSocket}
        >
          <FaCircleArrowUp className="text-xl" />
        </button>
      </div>
    </div>
  );
}

export default NewChatCard;
