// LIBRARIES
const express = require('express');
const path = require('path');
const app = express();
const cors = require('cors');
const helmet = require('helmet');

app.use(helmet());
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const userRoutes = require('./routes/User');
const messageRoutes = require('./routes/Message');
const commentRoutes = require('./routes/Comment');
const moderationRoutes = require('./routes/Moderation');

app.use('/api/auth', userRoutes);
app.use('/api/messages', messageRoutes);
app.use('/api', commentRoutes);
app.use('/api/mod', moderationRoutes);
app.use('/images', express.static(path.join(__dirname, 'images')));

module.exports = app;
