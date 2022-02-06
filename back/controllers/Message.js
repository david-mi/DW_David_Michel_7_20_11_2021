const { Message, User, Like } = require('../models');
// const Message = models.Message;

exports.getAllMessages = async (req, res) => {

  try {
    const messages = await Message.findAll({
      include: [
        { model: User, attributes: ['username'] },
      ],
    });
    !messages.length
      ? res.status(404).json({ message: "Aucun message dans la base de donnée" })
      : res.status(200).json(messages);
  } catch (err) {
    res.send(err);
  }
};

exports.getUserMessages = async (req, res) => {
  try {
    const limit = parseInt(req.query.limit);
    const userid = req.query.userid;
    const username = req.query.username;
    console.log('limit: ' + limit);
    console.log('userId ' + userid);
    console.log('userName ' + username);
    const messages = await Message.findAll(
      {
        // where: userid ? { UserId: userid } : null,
        where: userid && { userid },
        limit: limit || null,
        include: [{
          model: User,
          attributes: [["username", "pseudo"]],
        }]
      }
    );
    !messages.length
      ? res.status(404).json({ message: "Aucun message trouvé" })
      : res.status(200).json(messages);
  } catch (err) {
    res.send(err);
  }
};

exports.getUserMessagesById = async (req, res) => {
  console.log('pdr');
  try {
    const message = await Message.findByPk(req.params.id, {

      attributes: ['id', 'text', 'attachment', 'createdAt', 'updatedAt'],
      include: [
        { model: User, attributes: ['username', 'id'] },
        { model: Like, attributes: ['id'], include: [{ model: User, attributes: [['username', 'pseudo']] }] }
      ],
    });
    message ? res.status(200).json(message) : res.status(404).json({ Message: "message non trouvé" });
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
