const models = require('../models');
const Message = models.Message;

module.exports = async (req, res, next) => {

  try {

    /* on cherche dans les messages avec l'id contenu dans la requête.
    Si on trouve le message associé, on vérifie que son UserId correspond bien 
    à l'USER_ID contenu dans le payload du token */
    const message = await Message.findByPk(req.params.id);
    if (!message) throw ({ message: "Message non trouvé", status: 404 });
    if (message.UserId !== req.token.USER_ID) throw ({ message: "Vous n'êtes pas le propriétaire de ce message", status: 403 });

    next();

  } catch (err) {
    return err.message && err.status
      ? res.status(err.status).json({ message: err.message })
      : res.status(400).json(err);
  }

};

