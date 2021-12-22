const express = require('express');
const app = express();
require('dotenv').config();

app.use(express.json());
app.use(express.urlencoded({
  extended: true
}));

const userRoutes = require('./routes/User');
const messageRoutes = require('./routes/Message');

app.use('/api/auth', userRoutes);
app.use('/api/messages', messageRoutes);

//! SUPERADMIN POUR FACILITER LES TESTS

const superAdminRoutes = require('./routes/SuperAdmin');
app.use('/api/superadmin', superAdminRoutes);

module.exports = app;
