const { User, Message, Comment } = require('../models');

module.exports = async (req, res, next) => {

  const status = req.token.status;
  const endpoint = req.path;

  console.log('status ' + status);
  console.log(status !== 'moderator');

  try {

    if (status !== 'admin' && status !== 'moderator') {
      throw ({ message: "Vous n'avez pas les droits pour cette action", status: 403 });
    }

    if (endpoint.search('user') !== -1) {
      const user = await User.findByPk(req.params.id);

      if (!user) throw ({ message: "Utilisateur non trouvé", status: 404 });

      if (status === 'moderator' && user.status === 'admin') {
        throw ({ message: "Vous n'avez pas les droits administrateur", status: 403 });
      }
    }

    if (endpoint.search('message') !== -1) {
      const message = await Message.findByPk(req.params.id);

      if (!message) throw ({ message: "Message non trouvé", status: 404 });

      const user = await User.findByPk(message.UserId);

      if (status === 'moderator' && user.status === 'admin') {
        throw ({ message: "Vous n'avez pas les droits administrateur", status: 403 });
      }

    }

    if (endpoint.search('comment') !== -1) {
      const comment = await Comment.findByPk(req.params.id);
      console.log(comment);
      if (!comment) throw ({ message: "Commentaire non trouvé", status: 404 });

      const user = await User.findByPk(comment.UserId);
      console.log(user);
      if (status === 'moderator' && user.status === 'admin') {
        throw ({ message: "Vous n'avez pas les droits administrateur", status: 403 });
      }

    }

    next();

  } catch (err) {
    console.log(err);
    return err.message && err.status
      ? res.status(err.status).json({ message: err.message })
      : res.status(400).json(err);
  }

};