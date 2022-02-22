const { Comment } = require('../models');

module.exports = async (req, res, next) => {

  try {

    /* on cherche dans les commentaires avec l'id contenu dans la requête.
    Si on trouve le commentaire associé, on vérifie que son UserId correspond bien 
    à l'USER_ID contenu dans le payload du token */
    const comment = await Comment.findByPk(req.params.id);
    if (!comment) return res.status(404).json({ Message: "Commentaire non trouvé" });
    if (comment.UserId !== req.token.USER_ID) return res.status(403).json({ message: "Vous n'êtes pas le propriétaire de ce commentaire" });

    next();

  } catch (err) {
    res.send(err);
  }

};