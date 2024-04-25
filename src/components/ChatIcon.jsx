import React from 'react';
import { FaBilibili } from "react-icons/fa6";
import { FaComment } from "react-icons/fa6";

const ChatIcon = ({ onClick }) =>  {
    return (
        <button onClick={onClick} className="fixed bottom-8 right-8 flex justify-center items-center bg-claytonBlue p-4 h-15 w-15 rounded-full text-white">
            <span>
                <FaComment className="text-white w-4"/>
            </span>
        </button>
    );
};

export default ChatIcon;