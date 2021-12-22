require('sequelize');
require('../dbConnection');
const models = require('../models');
const Message = models.Message;

exports.selectAllMessages = (req, res, next) => {
  Message.findAll()
    .then(messages => res.status(200).json(messages))
    .catch(err => res.status(400).json(err));
};

exports.postMessage = (req, res, next) => {
  console.log(req.body);
  Message.create({
    ...req.body
  })
    .then(message => res.status(201).json(message))
    .catch(err => res.status(400).json(err));
};

