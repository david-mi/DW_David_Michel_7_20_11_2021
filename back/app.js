const express = require('express');
const app = express();
require('dotenv').config();

app.use(express.json());

const userRoutes = require('./routes/User');
const messageRoutes = require('./routes/Message');

app.use('/api/auth', userRoutes);
app.use('/api/message', messageRoutes);


module.exports = app;
