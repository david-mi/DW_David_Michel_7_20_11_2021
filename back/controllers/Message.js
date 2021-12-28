const models = require('../models');
const Message = models.Message;

exports.getUserMessages = async (req, res) => {
  try {
    const limit = parseInt(req.query.limit);
    const userid = req.query.userid;
    console.log('limit: ' + limit);
    console.log('userId ' + userid);
    const messages = await Message.findAll(
      {
        where: userid ? { UserId: userid } : null,
        limit: limit || null,
        attributes: ['text', 'createdAt'],
        include: [{
          model: models.User,
          attributes: ['username'],
        }]
      }
    );
    !messages.length
      ? res.status(404).json({ message: "Aucune message trouvé" })
      : res.status(200).json(messages);
  } catch (err) {
    res.send(err);
  }
};

exports.postMessage = (req, res) => {

  Message.create({
    UserId: req.token.USER_ID,
    text: req.body.text
  })
    .then(message => res.status(200).json(message))
    .catch(err => res.status(400).json(err));

};

exports.deleteMessage = (req, res) => {
  Message.destroy({ where: { id: req.params.id } })
    .then(deleted => res.status(201).json({ message: "Message supprimé" }))
    .catch(err => res.status(400).json(err));

};

exports.editMessage = (req, res) => {
  Message.update(
    { text: req.body.text },
    { where: { id: req.params.id } })
    .then(msg => res.status(201).json(msg))
    .catch(err => res.status(400).json(err));
};
