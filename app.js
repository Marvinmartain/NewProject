const express = require('express');
const app = express();
const Log = require('./models/logs');
const fetch = require('node-fetch');

// GET all logs
app.get('/news', async (req, res) => {
    const apiKey = '<YOUR_NEWS_API_KEY>';
    const apiUrl = `https://newsapi.org/v2/top-headlines?country=us&apiKey=${apiKey}`;
    
    try {
      const response = await fetch(apiUrl);
      const data = await response.json();
      res.send(data.articles);
    } catch (error) {
      console.error(error);
      res.status(500).send('Error fetching news data');
    }
  }); 
  
app.get('/logs', async (req, res) => {
  try {
    const logs = await Log.find();
    res.json(logs);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// POST a new log
app.post('/logs', async (req, res) => {
  const log = new Log({
    title: req.body.title,
    description: req.body.description,
  });

  try {
    const newLog = await log.save();
    res.status(201).json(newLog);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// PUT update a log
app.put('/logs/:id', async (req, res) => {
  try {
    const log = await Log.findById(req.params.id);
    if (log == null) {
      return res.status(404).json({ message: 'Log not found' });
    }

    log.title = req.body.title;
    log.description = req.body.description;

    const updatedLog = await log.save();
    res.json(updatedLog);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// DELETE a log
app.delete('/logs/:id', async (req, res) => {
  try {
    const log = await Log.findById(req.params.id);
    if (log == null) {
      return res.status(404).json({ message: 'Log not found' });
    }

    await log.remove();
    res.json({ message: 'Log deleted' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Set up server
const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Server started on port ${port}`));
