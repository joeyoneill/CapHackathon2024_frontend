import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { ForceGraph2D } from 'react-force-graph';
 
function Graph() {
  const [graphData, setGraphData] = useState({ nodes: [], links: [] });
 
  useEffect(() => {
    axios.get('https://columbiateam1backend.azurewebsites.net/graphdb_display_test?user_email=test%40test.com')
      .then(response => {
        // Transform the data into nodes and links
        const nodes = [], links = [];
        response.data.forEach(doc => {
          nodes.push({ id: doc.document.id, level: 1, size: 15, ...doc.document });
          doc.children.forEach(child => {
            nodes.push({ id: child.id, level: 2, size: 5, ...child });
            links.push({ source: doc.document.id, target: child.id });
          });
        });
        setGraphData({ nodes, links });
      })
      .catch(error => console.error('Error fetching data:', error));
  }, []);

  const getNodeColor = node => {
    switch (node.level) {
        case 1:
            return 'blue';
        case 2:
            return 'green';
        default:
            return 'gray';
        }
  };

  const getNodeSize = node => {
    return node.size || 1;
  };
 
  return <ForceGraph2D graphData={graphData} nodeColor={getNodeColor} nodeVal={getNodeSize}/>;
}
 
export default Graph;