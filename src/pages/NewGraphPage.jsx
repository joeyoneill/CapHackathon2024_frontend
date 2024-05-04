import React, {useState} from "react";
import NewGraphSidebar from "../components/NewGraphSidebar";
import Graph from "../components/Graph";
import CapLogo from "../assets/CapLogo.png";

function NewGraphPage() {
  // state vars
  const [isLoadingDocs, setIsLoadingDocs] = useState(false);
  
  // JSX Return
  return (
    <div>

      {isLoadingDocs ? (
        <div className="modal modal-open">
          <div className="modal-box">
              <h3 className="font-bold text-lg text-center">Fetching Documents...</h3>
              <div className="flex justify-center py-4">
                  <span className="loading loading-spinner text-primary"></span>
                  <span className="loading loading-spinner text-secondary"></span>
                  <span className="loading loading-spinner text-accent"></span>
                  <span className="loading loading-spinner text-neutral"></span>
                  <span className="loading loading-spinner text-info"></span>
                  <span className="loading loading-spinner text-success"></span>
                  <span className="loading loading-spinner text-warning"></span>
                  <span className="loading loading-spinner text-error"></span>
              </div>
          </div>
      </div>
      ) : null}

    <div className="flex flex-row">
      <NewGraphSidebar
        setIsLoadingDocs={setIsLoadingDocs}
      />
      <div className="w-4/5  overflow-x-hidden">
        <div className="shadow-lg transform">
          {/* <h1 className="text-center pt-4">Capgemin.ai</h1> */}
          <img src={CapLogo} alt="Capgemin.ai" className="h-16 mx-auto" />
          {/* <div className="divider"/> */}
        </div>
        <Graph />
      </div>
    </div>

    </div>
  );
}

export default NewGraphPage;
