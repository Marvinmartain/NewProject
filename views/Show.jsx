import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

function Show() {
  const { id } = useParams();
  const [log, setLog] = useState(null);

  useEffect(() => {
    axios.get(`/logs/${id}`)
      .then(res => setLog(res.data))
      .catch(err => console.log(err));
  }, [id]);

  if (!log) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h2>{log.title}</h2>
      <p>{log.description}</p>
      <p>{new Date(log.date).toLocaleString()}</p>
    </div>
  );
}

export default Show;
