import React, { useState } from 'react';
import axios from 'axios';
import { useHistory } from 'react-router-dom';

const New = () => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const history = useHistory();

  const handleSubmit = async (event) => {
    event.preventDefault();
    await axios.post('/api/logs', { title, description });
    history.push('/');
  };

  return (
    <div>
      <h1>New Log</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="title">Title:</label>
          <input
            id="title"
            type="text"
            value={title}
            onChange={(event) => setTitle(event.target.value)}
          />
        </div>
        <div>
          <label htmlFor="description">Description:</label>
          <textarea
            id="description"
            value={description}
            onChange={(event) => setDescription(event.target.value)}
          />
        </div>
        <button type="submit">Create</button>
      </form>
    </div>
  );
};

export default New;
