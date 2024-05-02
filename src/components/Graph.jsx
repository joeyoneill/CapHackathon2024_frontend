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
          nodes.push({ id: doc.document.id, ...doc.document });
          doc.children.forEach(child => {
            nodes.push({ id: child.id, ...child });
            links.push({ source: doc.document.id, target: child.id });
          });
        });
        setGraphData({ nodes, links });
      })
      .catch(error => console.error('Error fetching data:', error));
  }, []);
 
  return <ForceGraph2D graphData={graphData} />;
}
 
export default Graph;