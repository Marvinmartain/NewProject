import React, { useState } from 'react';
import axios from 'axios';

function New() {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();

    axios.post('/logs', {
      title,
      description,
    })
      .then(res => console.log(res))
      .catch(err => console.log(err));

    setTitle('');
    setDescription('');
  };

  return (
    <div>
      <h2>Add New Log</h2>
      <form onSubmit={handleSubmit}>
        <label>Title:</label>
        <input type="text" value={title} onChange={e => setTitle(e.target.value)} />

        <label>Description:</label>
        <textarea value={description} onChange={e => setDescription(e.target.value)}></textarea>

        <button type="submit">Add Log</button>
      </form>
    </div>
  );
}

export default New;
