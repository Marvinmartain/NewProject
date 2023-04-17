import React, { useState, useEffect } from 'react';
import axios from 'axios';

function Index() {
  const [logs, setLogs] = useState([]);

  useEffect(() => {
    axios.get('/logs')
      .then(res => setLogs(res.data))
      .catch(err => console.log(err));
  }, []);

  return (
    <div>
      <h2>All Logs</h2>
      {logs.map(log => (
        <div key={log._id}>
          <h3>{log.title}</h3>
          <p>{log.description}</p>
          <p>{new Date(log.date).toLocaleString()}</p>
        </div>
      ))}
    </div>
  );
}

export default Index;
