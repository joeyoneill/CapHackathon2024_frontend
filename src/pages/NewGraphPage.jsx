import React from "react";
import NewGraphSidebar from "../components/NewGraphSidebar";
import Graph from "../components/Graph";
import CapLogo from "../assets/CapLogo.png";

function NewGraphPage() {
  return (
    <div className="flex flex-row">
      <NewGraphSidebar />
      <div className="w-4/5  overflow-x-hidden">
        <div className="shadow-lg transform">
          {/* <h1 className="text-center pt-4">Capgemin.ai</h1> */}
          <img src={CapLogo} alt="Capgemin.ai" className="h-16 mx-auto" />
          {/* <div className="divider"/> */}
        </div>
        <Graph />
      </div>
    </div>
  );
}

export default NewGraphPage;
