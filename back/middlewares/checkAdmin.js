const { User, Message, Comment } = require('../models');

module.exports = async (req, res, next) => {

  const status = req.token.status;
  const endpoint = req.path;

  try {

    if (status !== 'admin') throw ({ message: "Vous n'avez les droits pour cette action", status: 403 });

    if (endpoint.search('user') !== -1) {
      const user = await User.findByPk(req.params.id);
      if (!user) throw ({ message: "Utilisateur non trouvé", status: 404 });
    }

    if (endpoint.search('message') !== -1) {
      const message = await Message.findByPk(req.params.id);
      if (!message) throw ({ message: "Message non trouvé", status: 404 });
    }

    if (endpoint.search('comment') !== -1) {
      const comment = await Comment.findByPk(req.params.id);
      if (!comment) throw ({ message: "Message non trouvé", status: 404 });
    }

    next();

  } catch (err) {
    console.log(err);
    return err.message && err.status
      ? res.status(err.status).json({ message: err.message })
      : res.status(400).json(err);
  }

};