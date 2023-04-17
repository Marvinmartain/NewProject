const express = require('express');
const methodOverride = require('method-override');
const mongoose = require('mongoose');
const logRoutes = require('./routes/logs');

const app = express();

// Connect to database
mongoose.connect('mongodb://localhost/logs', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: false,
  useCreateIndex: true,
});

// Set up middleware
app.use(express.static('public'));
app.use(express.urlencoded({ extended: false }));
app.use(methodOverride('_method'));

// Set up routes
app.use('/logs', logRoutes);

// Log all incoming requests
app.use((req, res, next) => {
  console.log(`${req.method} request to ${req.path}`);
  next();
});

// Start server
const PORT = 3000;
app.listen(PORT, () => console.log(`Server listening on port ${PORT}`));
