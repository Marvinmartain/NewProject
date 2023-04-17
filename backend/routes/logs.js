const express = require('express');
const router = express.Router();
const Log = require('../models/logs');

// Get all logs
router.get('/', async (req, res) => {
  try {
    const logs = await Log.find();
    res.render('Index', { logs });
  } catch {
    res.redirect('/');
  }
});

// Show new log form
router.get('/new', (req, res) => {
  res.render('New', { log: new Log() });
});

// Create new log
router.post('/', async (req, res) => {
  const log = new Log({
    title: req.body.title,
    body: req.body.body,
  });
  try {
    const newLog = await log.save();
    res.redirect(`/logs/${newLog.id}`);
  } catch {
    res.render('New', {
      log,
      errorMessage: 'Error creating log',
    });
  }
});

// Show single log
router.get('/:id', async (req, res) => {
  try {
    const log = await Log.findById(req.params.id);
    res.render('Show', { log });
  } catch {
    res.redirect('/');
  }
});

// Show edit log form
router.get('/:id/edit', async (req, res) => {
  try {
    const log = await Log.findById(req.params.id);
    res.render('Edit', { log });
  } catch {
    res.redirect('/');
  }
});

// Update log
router.put('/:id', async (req, res) => {
  let log;
  try {
    log = await Log.findById(req.params.id);
    log.title = req.body.title;
    log.body = req.body.body;
    await log.save();
    res.redirect(`/logs/${log.id}`);
  } catch {
    if (log == null) {
      res.redirect('/');
    } else {
      res.render('Edit', {
        log,
        errorMessage: 'Error updating log',
      });
    }
  }
});

// Delete log
router.delete('/:id', async (req, res) => {
  try {
    await Log.findByIdAndDelete(req.params.id);
    res.redirect('/logs');
  } catch {
    res.redirect('/logs');
  }
});

module.exports = router;

