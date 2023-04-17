const express = require('express');
const app = express();
const Log = require('./models/logs');

// GET all logs
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
