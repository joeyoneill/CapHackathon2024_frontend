import React, { useEffect, useState } from "react";
import axios from "axios";
import { ForceGraph2D } from "react-force-graph";
import { useSelector } from "react-redux";
import { selectCurrentAuthToken, selectCurrentDocumentTitle } from "../store/auth/AuthSlice";

function Graph() {
  const token = useSelector(selectCurrentAuthToken);
  const docTitle = useSelector(selectCurrentDocumentTitle);

  const [graphData, setGraphData] = useState({ nodes: [], links: [] });

  useEffect(() => {
    axios
      .post(
        "https://columbiateam1backend.azurewebsites.net/document_graph",
        { file_name: `${docTitle}` },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )
      .then((response) => {
        console.log("Nodes Response: ", response.data.nodes);
        // Transform the data into nodes and links
        const nodes = response.data.nodes.map((node, index) => ({
          //   ...node,
          //   color: node.level === 'higher' ? 'red' : 'blue', // Example logic to set color based on level
          id: node.id,
          name: node.name,
          size: 
            index === 0 
              ? 10 // File Name Node Size
              : node.chunk && node.data
              ? 1 // Level 2 node size
              : 0.5, // Level 3 node size
          color:
            index === 0
              ? "darkBlue" // Level 1 node color
              : node.chunk && node.data
              ? "blue" // Level 2 node color
              : "lightBlue", // Level 3 node color
        }));
        const links = response.data.links.map((link) => ({
          source: link.source,
          target: link.target,
        }));
        setGraphData({ nodes, links });
      })
      .catch((error) => console.error("Error fetching data:", error));
  }, [docTitle]);

  return (
    <ForceGraph2D
      graphData={graphData}
      //   nodeColor={getNodeColor}
        nodeVal={(node) => node.size}
    />
  );
}

export default Graph;
