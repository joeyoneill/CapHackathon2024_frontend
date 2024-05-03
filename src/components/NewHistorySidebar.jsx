// imports
import {v4 as uuidv4} from "uuid";

// Main Component
function NewHistorySidebar({
    allHistory,
    splashPage,
    setChatId,
    reducerDispatch
}) {
    
    // New Chat Button Handler
    const handleNewChat = () => {
        
        // Get UUID for new chat
        const uuid = uuidv4();

        // Set the chat ID
        setChatId(uuid);

        // Log the UUID
        console.log('UID: ', uuid);
    };

    // Chat Selection Handler
    const handleChatSelection = (index, chat_id) => {
        setChatId()
    };
    
    return (
        <div className="bg-slate-100 w-[20vw] h-screen p-4 flex flex-col">

            {/* New Chat Button */}
            <div>
                <button
                    className="btn btn-info w-full text-white"
                    onClick={handleNewChat}
                >
                    New Chat
                </button>
            </div>

            {/* Chat Selector */}
            <div className="overflow-y-auto pt-4 pb-4 flex flex-col space-y-2">
                {allHistory.map((item, index) => (
                    <div
                        className="p-2 pl-4 pr-4 text-left hover:bg-slate-200 cursor-pointer rounded-md overflow-x-hidden"
                        onClick={handleChatSelection}
                    >
                        { item.history[0].human.length > 19 
                            ? item.history[0].human.substring(0, 26) + '...'
                            : item.history[0].human
                        }
                    </div>
                ))}
            </div>

            {/* Knowledge Graphs Button */}
            <div className="mt-auto">
                <button
                    className="btn btn-info w-full text-white"
                >
                    Knowledge Graphs
                </button>
            </div>

        </div>
    );
}

export default NewHistorySidebar;