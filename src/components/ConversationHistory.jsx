import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate, useLocation } from "react-router-dom";
import { FaPenToSquare } from "react-icons/fa6";
import { Link } from "react-router-dom";
import { getConversationHistory } from "../store/auth/AuthSlice";
import {
  selectCurrentAuthToken,
  selectPrevConversations,
  setCurrentConversation,
  reset,
} from "../store/auth/AuthSlice";
import ChatButton from "./ChatButton";
import Loader from "./Loader";

function ConversationHistory() {
  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const token = useSelector(selectCurrentAuthToken);

  const [loading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState("Chat");

  // state for the files
  const [files, setFiles] = useState([]);

  const prevConversations = useSelector(selectPrevConversations);

  // Check the pathname to determine the button text and route
  const buttonText = location.pathname === "/Chat" ? "View Graph" : "View Chat";
  const buttonRoute = location.pathname === "/Chat" ? "/Graph" : "/Chat";

  useEffect(() => {
    if (token) {
      setLoading(true);
      console.log("loading...");
      dispatch(getConversationHistory({ authToken: token }));
      setLoading(false);
    }
  }, [token, dispatch]);

  // handles the navigation between the chat and graph pages
  const handleNavigate = () => {
    setCurrentPage(buttonText === "View Graph" ? "Graph" : "Chat");
    navigate(buttonRoute);
  };

  // handles the logout
  const handleLogout = () => {
    dispatch(reset());
    navigate("/");
  };

  // File upload functions

  // File Selection Handler
  const handleFileChange = (event) => {
    setFiles([...files, ...Array.from(event.target.files)]);
  };

  // File Removal Handler
  const handleFileRemove = (index) => {
    const newFiles = files.filter((_, i) => i !== index);
    setFiles(newFiles);
  };

  // File Upload Handler
  const uploadFiles = async () => {
    // Upload Files
    // TODO: Implement File Upload Logic
    console.log(files);

    // Initialize FormData
    const formData = new FormData();

    // Append Files to FormData
    files.forEach((file) => {
      formData.append("files", file);
    });

    // API CALL
    try {
      const response = await fetch(
        "https://columbiateam1backend.azurewebsites.net/upload_files",
        {
          method: "POST",
          body: formData,
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      const result = await response.json();
      console.log(result);
    } catch (error) {
      console.error("Error uploading files:", error);
    }

    // Clear Files
    setFiles([]);
  };

  return (
    <div className="flex flex-col h-full">
      {/* header for the conversation pane */}
      <div className="flex flex-row h-10 items-center justify-center justify-between m-2">
        <p className="font-semibold">Start New Chat</p>
        <p>
          <FaPenToSquare />
        </p>
      </div>

      {/* File Upload Piece */}
      <div className="w-full px-2">
        {/* Open Modal Button */}
        <button
          className="w-full bg-capVibrantBlue rounded-lg text-white mt-4 h-8"
          onClick={() =>
            document.getElementById("file_upload_modal").showModal()
          }
        >
          Upload Documents
        </button>

        {/* File Upload Modal */}
        <dialog id="file_upload_modal" className="modal">
          <div className="modal-box">
            {/* Close Modal Button */}
            <form method="dialog">
              <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">
                ✕
              </button>
            </form>

            <h3 className="font-bold text-lg text-center mb-2">File Upload</h3>
            <hr />

            <p className="py-4 text-md font-semibold text-center">
              Upload Files (.docx, .pdf, .txt)
            </p>
            <div className="flex justify-center">
              <input
                type="file"
                multiple
                accept=".docx,.pdf,.txt"
                className="file-input file-input-bordered file-input-sm w-full max-w-xs"
                onChange={handleFileChange}
              />
            </div>

            <ul className="my-4 space-y-2">
              <li className="font-semibold">Selected Files:</li>
              {files.map((file, index) => (
                <li key={index} className="flex justify-between">
                  {file.name}
                  <button
                    className="btn btn-error btn-xs w-1/5 text-white"
                    onClick={() => handleFileRemove(index)}
                  >
                    Remove
                  </button>
                </li>
              ))}
            </ul>

            <div className="flex justify-center">
              <button
                className="btn bg-capVibrantBlue h-10 w-1/2 btn-sm mt-4 text-white"
                onClick={uploadFiles}
              >
                Upload Files
              </button>
            </div>
          </div>
        </dialog>
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
      <div className="mt-auto px-2 absolute bottom-4 w-1/5">
        <button
          className="w-full bg-capBlue rounded-lg text-white mt-4 h-8"
          onClick={handleNavigate}
        >
          {buttonText}
        </button>
        <button
          className="w-full bg-red-400 rounded-lg text-white mt-2 h-8"
          onClick={handleLogout}
        >
          Log Out
        </button>
      </div>
    </div>
  );
}

export default ConversationHistory;
