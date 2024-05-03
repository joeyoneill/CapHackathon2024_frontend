import React from "react";
import NewGraphSidebar from "../components/NewGraphSidebar";
import Graph from "../components/Graph";

function NewGraphPage() {
  return (
    <div className="flex flex-row">
      <NewGraphSidebar />
      <div className="w-4/5 mx-5 overflow-x-hidden">
        <Graph />
      </div>
    </div>
  );
}

export default NewGraphPage;
