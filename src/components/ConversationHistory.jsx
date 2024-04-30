import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { FaPenToSquare } from "react-icons/fa6";
import { Link } from "react-router-dom";
import { getConversationHistory } from "../store/auth/AuthSlice";
import {
  selectCurrentAuthToken,
  selectPrevConversations,
  setCurrentConversation,
} from "../store/auth/AuthSlice";
import ChatButton from "./ChatButton";
import Loader from "./Loader";

function ConversationHistory() {
  const dispatch = useDispatch();
  const token = useSelector(selectCurrentAuthToken);

  const [loading, setLoading] = useState(false);

  const prevConversations = useSelector(selectPrevConversations);

  useEffect(() => {
    if (token) {
      setLoading(true);
      console.log('loading...')
      dispatch(getConversationHistory({ authToken: token }));
      setLoading(false);
    }
  }, [token, dispatch]);

  return (
    <div>
      {/* header for the conversation pane */}
      <div className="flex flex-row h-10 items-center justify-center justify-between m-2">
        <p className="font-semibold">Start New Chat</p>
        <p>
          <FaPenToSquare />
        </p>
      </div>

      {loading ? (
        <>
          <Loader /> // Show the loader if loading is true
          <p>test</p>
        </>
      ) : (
        <div>
          {/* Your other JSX content here */}

          {/* previous conversations from the given user */}
          <div className="flex flex-col space-y-2 mx-2 mt-20">
            <p className="font-semibold">Previous Conversations</p>
            {prevConversations.map((conversation) => (
              <div
                key={conversation.id}
                className="flex flex-row items-center justify-between"
              >
                <ChatButton
                  title={conversation.id}
                  conversationHistory={conversation.history}
                />
              </div>
            ))}
          </div>
        </div>
      )}

      {/* {loading && <Loader />} */}

      {/* previous conversations from the given user */}
      {/* <div className="flex flex-col space-y-2 mx-2 mt-20">
        <p className='font-semibold'>Previous Conversations</p>
        {prevConversations.map((conversation) => (
          <div
            key={conversation.id}
            className="flex flex-row items-center justify-between"
          >
            <ChatButton title={conversation.id} conversationHistory={conversation.history}/>
          </div>
        ))}
      </div> */}

      {/* sign out button */}
      {/* <div>
        <Link to='/Login'>
            <button className="flex w-4/5 justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">
                Sign out
            </button>
        </Link>
      </div> */}
    </div>
  );
}

export default ConversationHistory;
