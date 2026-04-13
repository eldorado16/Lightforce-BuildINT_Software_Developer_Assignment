const express = require('express');
const taskRoutes = require('./routes/taskRoutes');
const { notFoundHandler, errorHandler } = require('./middlewares/errorHandler');

const app = express();

app.disable('x-powered-by');
app.use(express.json({ limit: '10kb' }));

app.use('/tasks', taskRoutes);

app.use(notFoundHandler);
app.use(errorHandler);

module.exports = app;
