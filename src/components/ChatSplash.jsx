import React from "react";
import capSpade from "../assets/capSpade.png";
import GridBox from "./GridBox";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router";

function ChatSplash() {

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const navigateToGraph = () => {
    navigate("/Graph");
  };

  return (
    <div className="flex flex-col justify-center items-center flex-grow">
      <img src={capSpade} alt="spade" className="h-16 w-16 mb-2" />
      <p className="font-semibold text-xl">How can I help you today?</p>
      <div className="grid grid-cols-2 gap-4 mt-10">
        <GridBox header="Chat With Your Data" info="Easily query your added data" />
        <GridBox header="View Knowledge Graphs" info="Visualize your data" onClick={navigateToGraph} />
        <GridBox header="Upload Documents" info="Securely add additional data" />
        <GridBox header="Stored Conversations" info="Access information from past conversations" />
      </div>
    </div>
  );
}

export default ChatSplash;
