const express = require('express');
const router = express.Router();
const Log = require('../models/Log');

// index route
router.get('/', async (req, res) => {
  const logs = await Log.find();
  res.render('index', { logs });
});

// new route
router.get('/new', (req, res) => {
  res.render('new');
});

// create route
router.post('/', async (req, res) => {
  const log = new Log(req.body);
  await log.save();
  res.redirect('/logs');
});

// show route
router.get('/:id', async (req, res) => {
  const log = await Log.findById(req.params.id);
  res.render('show', { log });
});

// edit route
router.get('/:id/edit', async (req, res) => {
  const log = await Log.findById(req.params.id);
  res.render('edit', { log });
});

// update route
router.put('/:id', async (req, res) => {
  const log = await Log.findByIdAndUpdate(req.params.id, req.body, { new: true });
  res.redirect(`/logs/${log.id}`);
});

// delete route
router.delete('/:id', async (req, res) => {
  await Log.findByIdAndDelete(req.params.id);
  res.redirect('/logs');
});

module.exports = router;
