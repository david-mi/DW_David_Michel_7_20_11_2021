const { Comment } = require('../models');

module.exports = async (req, res, next) => {

  try {

    const comment = await Comment.findByPk(req.params.id);
    if (!comment) return res.status(404).json({ Message: "Commentaire non trouvé" });
    console.log(comment.UserId, req.token.USER_ID);
    if (comment.UserId !== req.token.USER_ID) return res.status(403).json({ message: "Vous n'êtes pas le propriétaire de ce commentaire" });

    next();

  } catch (err) {
    res.send(err);
  }

};