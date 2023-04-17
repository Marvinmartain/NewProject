import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Index = () => {
  const [logs, setLogs] = useState([]);

  useEffect(() => {
    async function fetchLogs() {
      const response = await axios.get('/api/logs');
      setLogs(response.data);
    }
    fetchLogs();
  }, []);

  return (
    <div>
      <h1>Log Index</h1>
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Title</th>
            <th>Description</th>
            <th>Created At</th>
            <th>Updated At</th>
          </tr>
        </thead>
        <tbody>
          {logs.map((log) => (
            <tr key={log._id}>
              <td>{log._id}</td>
              <td>{log.title}</td>
              <td>{log.description}</td>
              <td>{log.createdAt}</td>
              <td>{log.updatedAt}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Index;
