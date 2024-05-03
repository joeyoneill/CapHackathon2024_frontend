// imports

// Main Component
function NewChatCard({
    aiHistory,
    userHistory,
}) {
    return (
        <div className="flex flex-col h-[100vh]">

            {/* Header */}
            <div>
                <h1 className="text-center pt-4">Capgemin.ai</h1>
                <div className="divider"/>
            </div>

            {/* Chat Area */}
            <div className="mt-0 overflow-auto">
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
        </div>
    );
}

export default NewChatCard;