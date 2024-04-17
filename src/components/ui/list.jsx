import React, { useState, useEffect } from 'react';
import axios from 'axios';

function List() {
  const [files, setFiles] = useState([]);

  useEffect(() => {
    const url = 'https://recruiters-best-friend-backend.vercel.app/list/Gitlab';
    axios.get(url)
      .then(response => {
        // Update the state with the fetched data
        setFiles(response.data);
      })
      .catch(error => {
        // Handle error
        console.error('Error fetching data:', error);
      });
  }, []); // Empty dependency array means this effect only runs once, similar to componentDidMount

  return (
    <div>
      <h2>Files:</h2>
      <ul>
        {files.map((value, index) => (
          <li key={index}>{value}</li>
        ))}
      </ul>
    </div>
  );
}

export default List;
