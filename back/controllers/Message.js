const models = require('../models');
const Message = models.Message;

exports.selectAllMessages = (req, res) => {

  Message.findAll()
    .then(messages => messages.length == 0
      ? res.status(404).json({ message: "Aucun message dans la base de donnée" })
      : res.status(200).json(messages))
    .catch(err => res.status(500).json(err));

};

exports.postMessage = (req, res) => {

  Message.create({
    UserId: req.token.USER_ID,
    text: req.body.text
  })
    .then(message => res.status(201).json(message))
    .catch(err => res.status(400).json(err));

};

exports.deleteMessage = (req, res) => {

  Message.destroy({ where: { id: req.params.id } })
    .then(res => res.status(201).json({ message: "Message supprimé" }))
    .catch(err => res.status(500).json(err));

};
