const models = require('../models');
const Message = models.Message;

module.exports = async (req, res, next) => {

  try {

    const message = await Message.findByPk(req.params.id);

    if (!message) return res.status(404).json({ Message: "Message non trouvé" });

    if (message.userId !== req.token.USER_ID) return res.status(403).json({ Message: "Vous n'êtes pas les propriétaire de ce message" });

    next();

  } catch (err) {
    res.send(err);
  }

};