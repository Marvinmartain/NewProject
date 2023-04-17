const express = require('express');
const router = express.Router();
const Log = require('../models/log');

router.get('/', async (req, res) => {
  try {
    const logs = await Log.find();
    res.render('index', { logs });
  } catch (err) {
    console.error(err);
    res.status(500).send('Server Error');
  }
});

router.get('/new', (req, res) => {
  res.render('new', { log: new Log() });
});

router.post('/', async (req, res) => {
  const log = new Log({
    title: req.body.title,
    body: req.body.body
  });
  try {
    const newLog = await log.save();
    res.redirect(`/logs/${newLog.id}`);
  } catch (err) {
    console.error(err);
    res.render('new', {
      log,
      errorMessage: 'Error creating log'
    });
  }
});

router.get('/:id', async (req, res) => {
  try {
    const log = await Log.findById(req.params.id);
    res.render('show', { log });
  } catch (err) {
    console.error(err);
    res.status(500).send('Server Error');
  }
});

router.get('/:id/edit', async (req, res) => {
  try {
    const log = await Log.findById(req.params.id);
    res.render('edit', { log });
  } catch (err) {
    console.error(err);
    res.status(500).send('Server Error');
  }
});

router.put('/:id', async (req, res) => {
  try {
    let log = await Log.findById(req.params.id);
    log.title = req.body.title;
    log.body = req.body.body;
    await log.save();
    res.redirect(`/logs/${log.id}`);
  } catch (err) {
    console.error(err);
    res.status(500).send('Server Error');
  }
});

router.delete('/:id', async (req, res) => {
  try {
    await Log.findByIdAndDelete(req.params.id);
    res.redirect('/logs');
  } catch (err) {
    console.error(err);
    res.status(500).send('Server Error');
  }
});

module.exports = router;
