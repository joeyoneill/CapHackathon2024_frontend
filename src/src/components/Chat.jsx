import React, { useState, useEffect } from "react";
import { connect, useSelector } from "react-redux";
import { selectCurrentAuthToken, selectCurrentConversation } from "../store/auth/AuthSlice";
import { FaCircleArrowUp } from "react-icons/fa6";
import MessageBubble from "./MessageBubble";
import UserMessageBubble from "./UserMessageBubble";

function Chat() {
  // state to hold the input value
  const [input, setInput] = useState("");
  // state to tell if there's text in the input field
  const [textEntered, setTextEntered] = useState("false");
  const [userInput, setUserInput] = useState('');
  const [response, setResponse] = useState('');
  const [socket, setSocket] = useState(null);

  const token = useSelector(selectCurrentAuthToken);

  const currentConversation = useSelector(selectCurrentConversation);

  const handleChange = (e) => {
    setInput(e.target.value);
    setTextEntered(e.target.value.length > 0);
  };

  // websocket connection
  const connectWebSocket = () => {
    const ws = new WebSocket('wss://columbiateam1backend.azurewebsites.net/ws');
 
    ws.onopen = () => {
      console.log('Connected to Websocket...');
      setSocket(ws);
     
      if (userInput.trim() !== '') {
        ws.send(
          JSON.stringify(
            {
              query: userInput,
              chatId: '1234',
              jwt: token,
              email: 'test@test.com'
            }
        ));
        setUserInput('');
      }
    };
 
    ws.onmessage = (event) => {
      const msg = event.data;
      if (msg === '<<END>>') {
        ws.close();
      }
      else if (msg === '<<E:NO_QUERY>>') {
        ws.close();
        console.log('ERROR: No query provided...')
      }
      else if (msg === '<<E:NO_CHAT_ID>>') {
        ws.close();
        console.log('ERROR: No chat ID provided...')
      }
      else if (msg === '<<E:INVALID_JWT>>') {
        ws.close();
        console.log('ERROR: Invalid JWT Token provided...')
      }
      else if (msg === '<<E:NO_EMAIL>>') {
        ws.close();
        console.log('ERROR: No email provided...')
      }
      else {
        setResponse((prevResponse) => prevResponse + msg);
      }
    };

    ws.onclose = () => {
      console.log('Disconnected from server');
      setSocket(null);
    };
  };

  return (
    <div className="flex flex-col h-screen w-full">
      {/* header */}
      <div className="h-10 mt-3">
        Hackathon GPT
      </div>

      {/* message history */}
      <div className='flex flex-col space-y-4 overflow-y-auto mb-4'>
        {currentConversation.map((message, index) => {
          if (message.ai && message.human) {
            return (
              <>
               <UserMessageBubble key={index} message={message.human} />
               <MessageBubble key={index} message={message.ai} />
              </>
            );
          } else if (message.human) {
            return <UserMessageBubble key={index} message={message.human} />;
          }
          return null; // Handle other message types if needed
        })}
        <div>{response}</div>
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
        <button
          className={`absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none ${
            textEntered ? "text-black" : "text-gray-400"
          }`}
          onClick={connectWebSocket}
        >
          <FaCircleArrowUp className="h-5 w-5" />
        </button>
        <button onClick={connectWebSocket}>Test</button>
      </div>
    </div>
  );
}

export default Chat;
