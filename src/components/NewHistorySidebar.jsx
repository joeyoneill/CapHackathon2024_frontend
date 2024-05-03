// imports
import { v4 as uuidv4 } from "uuid";
import { useState } from "react";
import { useNavigate } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import { reset } from "../store/auth/AuthSlice";
import {selectCurrentAuthToken} from "../store/auth/AuthSlice";

// Main Component
function NewHistorySidebar({
  allHistory,
  splashPage,
  setChatId,

  setAiHistory,
  setUserHistory,
  showSpash,
  setShowSplash,
  isLoadingLock,
}) {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const token = useSelector(selectCurrentAuthToken);

  const [files, setFiles] = useState([]);

  // New Chat Button Handler
  const handleNewChat = () => {
    // Get UUID for new chat
    const uuid = uuidv4();

    // Set the chat ID
    setChatId(uuid);

    // Set Splash to true
    setShowSplash(true);

    // Clear AI & HUMAN HISTORY
    setAiHistory([]);
    setUserHistory([]);
  };

  // Chat Selection Handler
  const handleChatSelection = (index, chat_id) => {
    // set to the proper chat id
    setChatId(chat_id);

    // Set AI & HUMAN HISTORY
    setAiHistory(allHistory[index].history.ai);
    setUserHistory(allHistory[index].history.human);

    // Set Splash to false
    setShowSplash(false);
  };

  // used to navigate to the graph page
  const navigateToGraph = () => {
    navigate("/NewGraph");
  };

  // logs user out
  const logUserOut = () => {
    dispatch(reset());
    navigate("/");
  };

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
    <div className="bg-slate-100 w-[20vw] h-screen p-4 flex flex-col">
      {/* New Chat Button */}
      <div>
        <button
          className="btn btn-info w-full text-white"
          onClick={handleNewChat}
          disabled={isLoadingLock}
        >
          New Chat
        </button>
      </div>

      {/* <div>
        <button className="btn bg-capBlue w-full mt-2 text-white">
          Upload Files
        </button>
      </div> */}
      <div className="w-full">
        {/* Open Modal Button */}
        <button
          className="btn w-full bg-capVibrantBlue rounded-lg text-white mt-4 h-8"
          onClick={() =>
            document.getElementById("file_upload_modal").showModal()
          }
          disabled={isLoadingLock}
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

      <div className="divider" />
      <p className="mt-2 text-center font-semibold">Previous Conversations</p>

      {/* Chat Selector */}
      <div className="overflow-y-auto pt-4 pb-4 flex flex-col space-y-2">
        {allHistory.map((item, index) => (
          <div
            className="p-2 pl-4 pr-4 text-left hover:bg-slate-200 cursor-pointer rounded-md overflow-x-hidden text-sm font-semibold"
            onClick={() => {
              if (!isLoadingLock) {
                handleChatSelection(index, item.id);
              }
            }}
          >
            {item.history.human[0].length > 19
              ? item.history.human[0].substring(0, 26) + "..."
              : item.history.human[0]}
          </div>
        ))}
      </div>



      {/* Knowledge Graphs Button */}
      <div className="mt-auto">
        <button
          className="btn btn-info w-full text-white"
          onClick={navigateToGraph}
          disabled={isLoadingLock}
        >
          Knowledge Graphs
        </button>
        <button
          className="btn btn-error w-full text-white mt-2"
          onClick={logUserOut}
          disabled={isLoadingLock}
        >
          Log Out
        </button>
      </div>
    </div>
  );
}

export default NewHistorySidebar;
