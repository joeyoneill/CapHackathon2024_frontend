import React, { useState, useEffect, useRef } from "react";
import { connect, useSelector, useDispatch } from "react-redux";
import {
  selectCurrentAuthToken,
  selectCurrentConversation,
  selectCurrentConversationID,
  selectPrevConversations,
  selectUserEmail,
} from "../store/auth/AuthSlice";
import { updatePrevConversations } from "../store/auth/AuthSlice";
import { getConversationHistory } from "../store/auth/AuthSlice";
import { setCurrentConversation } from "../store/auth/AuthSlice";
import { FaCircleArrowUp } from "react-icons/fa6";
import MessageBubble from "./MessageBubble";
import UserMessageBubble from "./UserMessageBubble";
import CapLogoWhite from "../assets/CapLogoWhite.png";

function Chat() {
  const dispatch = useDispatch();

  const messagesEndRef = useRef(null);

  // state to hold the input value
  const [input, setInput] = useState("");
  // state to tell if there's text in the input field
  const [textEntered, setTextEntered] = useState("false");
  const [userInput, setUserInput] = useState("");
  const [userMessages, setUserMessages] = useState([]);
  const [aiMessages, setAiMessages] = useState([]);
  const [response, setResponse] = useState("");
  const [socket, setSocket] = useState(null);

  //tester for the useEffect trigger
  const [wsClosed, setWSClosed] = useState(false);

  const token = useSelector(selectCurrentAuthToken);
  const userEmail = useSelector(selectUserEmail);
  const currentConversation = useSelector(selectCurrentConversation);
  const currentConversationId = useSelector(selectCurrentConversationID);
  const prevConversations = useSelector(selectPrevConversations);

  const allConversations = useSelector(selectPrevConversations);

  const handleChange = (e) => {
    setUserInput(e.target.value);
    setTextEntered(e.target.value.length > 0);
  };

  // used to get the updated conversation history
  useEffect(() => {
    dispatch(getConversationHistory({ authToken: token}));
    console.log('Updated conversation history fetched');
    dispatch(updatePrevConversations(currentConversation));
    console.log('Updated prevConversations');
  }, [dispatch, wsClosed, currentConversation]);

  // websocket connection
  const connectWebSocket = () => {
    const ws = new WebSocket("wss://columbiateam1backend.azurewebsites.net/ws");

    ws.onopen = () => {
      console.log("Connected to Websocket...");
      setWSClosed(false);
      setSocket(ws);

      if (userInput.trim() !== "") {
        ws.send(
          JSON.stringify({
            query: userInput,
            chatId: currentConversationId,
            jwt: `Bearer ${token}`,
            email: "test@test.com",
          })
        );
        setUserMessages((prevMessages) => [...prevMessages, userInput]);
        setUserInput("");
      }
    };

    ws.onmessage = (event) => {
      const msg = event.data;
      if (msg === "<<END>>") {
        ws.close();
      } else if (msg === "<<E:NO_QUERY>>") {
        ws.close();
        console.log("ERROR: No query provided...");
      } else if (msg === "<<E:NO_CHAT_ID>>") {
        ws.close();
        console.log("ERROR: No chat ID provided...");
      } else if (msg === "<<E:INVALID_JWT>>") {
        ws.close();
        console.log("ERROR: Invalid JWT Token provided... 2");
      } else if (msg === "<<E:NO_EMAIL>>") {
        ws.close();
        console.log("ERROR: No email provided...");
      } else {
        setResponse((prevMessage) => prevMessage + msg);
        // setAiMessages((prevMessages) => [...prevMessages, msg]);
      }
    };

    ws.onclose = () => {
      console.log("Current Conversation: ", currentConversation);
      dispatch(getConversationHistory({ authToken: token }));
      dispatch(updatePrevConversations(currentConversation));
      setResponse("");
      console.log("Disconnected from server");
      setSocket(null);
    };
  };

  useEffect(() => {
    console.log('Model Responses: ', aiMessages);
  }, [aiMessages]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [currentConversation]);

  return (
    <div className="flex flex-col h-screen w-full">
      {/* header */}
      <div className="h-16 mt-3 mb-2 rounded-md flex flex-row justify-center items-center text-white">
        <img 
          src={CapLogoWhite}
          alt='CapLogoWhite'
          className="h-20"
        />

        <div className='divider' />
        
      </div>

      {/* message history */}
      <div className="flex flex-col space-y-4 overflow-y-auto mb-4">
        {/* message history */}
        <div className="flex flex-col space-y-4 overflow-y-auto mb-4">
          {currentConversation.map((message, index) => (
            <>
              <UserMessageBubble
                key={`user-${index}`}
                message={message.human}
              />
              <MessageBubble key={`ai-${index}`} message={message.ai} />
            </>
          ))}
          {/* {userMessages.map((userMessage, index) => (
            <React.Fragment key={`message-${index}`}>
              <UserMessageBubble key={`user-${index}`} message={userMessage} />
              {aiMessages[index] && (
                <MessageBubble
                  key={`ai-${index}`}
                  message={aiMessages[index]}
                />
              )}
            </React.Fragment>
          ))} */}
          {userInput && <UserMessageBubble message={userInput} />}
          {console.log("Response state: ", response)}
          {response && <MessageBubble message={response} />}
          <div ref={messagesEndRef} />
        </div>
        {/* <div>{response}</div> */}
      </div>

      {/* chat input */}
      <div className="mt-auto w-full sm:w-3/5 flex justify-center items-center self-center mb-6 relative space-x-2">
        <textarea
          type="text"
          className="bg-white border border-slate-300 rounded-lg py-2 px-4 w-full focus:outline-none focus:ring focus:ring-slate-200 pr-10 h-15"
          placeholder="Message GPT..."
          value={userInput}
          onChange={handleChange}
        />
        <button
          className={`absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none ${
            textEntered ? "text-black" : "text-gray-400"
          }`}
          onClick={connectWebSocket}
        >
          {/* <FaCircleArrowUp className="h-5 w-5" /> */}
        </button>
        <button
          className="h-full border border-1 border-slate-300 bg-slate-200 rounded-lg w-16 flex justify-center items-center"
          onClick={connectWebSocket}
        >
          <FaCircleArrowUp className="text-xl"/>
        </button>
      </div>
    </div>
  );
}

export default Chat;
