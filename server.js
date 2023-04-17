const express = require('express');
const methodOverride = require('method-override');

const app = express();

// middleware functions
app.use(express.urlencoded({ extended: false }));
app.use(methodOverride('_method'));
app.use((req, res, next) => {
  console.log(`${req.method} ${req.url}`);
  next();
});

// routes
const logsRoutes = require('./routes/logs');
app.use('/logs', logsRoutes);

// start server
app.listen(3000, () => {
  console.log('Server is running on port 3000');
});
