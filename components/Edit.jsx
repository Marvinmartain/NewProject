import React, { useState, useEffect } from "react";
import { useHistory, useParams } from "react-router-dom";
import axios from "axios";

const Edit = () => {
  const [log, setLog] = useState({ title: "", description: "", date: "" });
  const { id } = useParams();
  const history = useHistory();

  useEffect(() => {
    const getLog = async () => {
      const { data } = await axios.get(`/logs/${id}`);
      setLog(data);
    };
    getLog();
  }, [id]);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setLog((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    await axios.put(`/logs/${id}`, log);
    history.push(`/logs/${id}`);
  };

  return (
    <div>
      <h1>Edit Log</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="title">Title</label>
          <input
            type="text"
            id="title"
            name="title"
            value={log.title}
            onChange={handleChange}
          />
        </div>
        <div>
          <label htmlFor="description">Description</label>
          <textarea
            id="description"
            name="description"
            value={log.description}
            onChange={handleChange}
          />
        </div>
        <div>
          <label htmlFor="date">Date</label>
          <input
            type="date"
            id="date"
            name="date"
            value={log.date}
            onChange={handleChange}
          />
        </div>
        <button type="submit">Save</button>
      </form>
    </div>
  );
};

export default Edit;
