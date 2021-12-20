const models = require('../models');
const Message = models.Message;

exports.postMessage = (req, res, next) => {
  console.log(req.body);
  Message.create({
    ...req.body
  })
    .then(message => res.status(201).json(message))
    .catch(err => res.status(400).json(err));
};