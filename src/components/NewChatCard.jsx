// imports
import React, { useState, useEffect, useRef } from "react";
import NewBottomBar from "./NewBottomBar";
import ChatSplash from "./ChatSplash";
import CapLogo from "../assets/CapLogo.png";

// Main Component
function NewChatCard({
    aiHistory,
    userHistory,
    userInput,
    aiResponse,
    setUserInput,
    connectWebSocket,
    isGenerating,
    userMsg,
    showSplash,
    setShowSplash,
}) {
    return (
        <div className="flex flex-col h-[100vh] w-[80vw]">

            {/* Header */}
            <div className='shadow-lg transform'>
                {/* <h1 className="text-center pt-4">Capgemin.ai</h1> */}
                <img src={CapLogo} alt="Capgemin.ai" className="h-16 mx-auto"/>
                {/* <div className="divider"/> */}
            </div>

            <div className="overflow-auto mt-2">
            {!showSplash ? (
            <div>
                {/* Chat Area */}
                <div className="">
                    {userHistory.map((message, index) => (
                        <div>
                            <div className="chat chat-end">
                                <div className="chat-bubble bg-slate-400 max-w-4xl text-white">
                                    {message}
                                </div>
                            </div>
                            <div className="chat chat-start">
                                <div className="chat-bubble bg-capVibrantBlue max-w-4xl text-white">
                                    {aiHistory[index]}
                                </div>
                            </div>
                        </div>
                    ))}

                    {isGenerating ? (
                        <div>
                            <div className="chat chat-end">
                                <div className="chat-bubble bg-slate-400 text-white">
                                    {userMsg}
                                </div>
                            </div>
                            <div className="chat chat-start">
                                <div className="chat-bubble bg-capVibrantBlue text-white">
                                    {aiResponse}<span className="loading loading-spinner loading-xs"></span>
                                </div>
                            </div>
                        </div>
                    ):null}
                </div>
            </div>
            ) : (
              <div className='flex flex-col items-center justify-center h-[80vh]'>
                <ChatSplash />
              </ div>
                
            )}
            </div>
            
            {/* Bottom Bar */}
            <div className="mt-auto">
                <NewBottomBar
                    setUserInput={setUserInput}
                    userInput={userInput}
                    connectWebSocket={connectWebSocket}
                    isGenerating={isGenerating}
                />
            </div>
        </div>
    )};

export default NewChatCard;
