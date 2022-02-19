// MODELS
const { Message, User, Comment } = require('../models');

// TOOLS
const { handleErrorImage, deletePreviousCommentImage } = require('../tools/handleErrorImage');

exports.getCommentByMessageId = async (req, res) => {

  const messageId = req.params.messageid;
  const comments = await Comment.findAll({
    where: { messageId },
    include: [{
      model: User,
      attributes: ['username']
    }]
  });

  res.status(200).json(comments);

};

exports.postComment = async (req, res) => {

  const messageId = req.params.id;
  const userIdToken = req.token.USER_ID;
  const { newData } = res.locals;

  try {

    const message = await Message.findByPk(messageId);
    if (!message) throw ({ message: "Ce message n'existe pas" });


    if (req.file) {

      // on récupère l'image stockée par multer et on construit son URL
      const { filename } = req.file;
      const newPicture = `${req.protocol}://${req.get('host')}/images/comment/${filename}`;

      const message = await Comment.create(
        {
          ...newData,
          UserId: userIdToken,
          messageId,
          attachment: newPicture
        });

      res.status(201).json({ success: message });

    }

    else {

      const textOnly = await Comment.create(
        {
          ...newData,
          UserId: userIdToken,
          messageId
        });

      res.status(201).json({ success: textOnly });

    }

  }
  catch (err) {
    if (req.file) await handleErrorImage(req, 'comment');
    res.status(500).json(err);
  }

};

exports.editComment = async (req, res) => {

  const { newData } = res.locals;
  const commentId = req.params.id;

  try {

    if (req.file) {
      // on récupère l'image stockée par multer et on construit son URL
      const { filename } = req.file;
      const newPicture = `${req.protocol}://${req.get('host')}/images/comment/${filename}`;

      // on cherche l'url de l'ancienne image de ce commentaire puis on la stocke
      const getComment = await Comment.findByPk(commentId);
      let previousPicture = '';

      if (getComment.attachment) {
        previousPicture = getComment.attachment.split('/images/comment/')[1];
      };

      // mise à jour du commentaire
      await Comment.update(
        { ...newData, attachment: newPicture },
        { where: { id: commentId } });

      // on supprime l'ancienne image du dossier comment
      if (getComment.attachment) await deletePreviousCommentImage(previousPicture);
    }
    else {
      // mise à jour du commentaire sans image
      await Comment.update(
        { ...newData },
        { where: { id: commentId } });
    }

    res.status(201).json({ message: 'Commentaire mis à jour' });

  }
  catch (err) {
    if (req.file && err.name !== 'unlink') await handleErrorImage(req, 'comment');
    res.status(500).json(err);
  }
};


exports.deleteCommentImage = async (req, res) => {

  try {
    const idComment = req.params.id;
    const comment = await Comment.findByPk(idComment);
    const previousPicture = comment.attachment.split('/images/comment/')[1];

    await deletePreviousCommentImage(previousPicture);

    await Comment.update(
      { attachment: null },
      { where: { id: idComment } }
    );
    res.status(201).json({ message: `L'image ${previousPicture} à bien été supprimée du commentaire` });
  }
  catch (err) {
    res.status(500).json(err);
  }

};

exports.deleteComment = async (req, res) => {

  const commentId = req.params.id;

  try {

    const getComment = await Comment.findByPk(commentId);

    let commentPicture = '';

    if (getComment.attachment) {
      commentPicture = getComment.attachment.split('/images/comment/')[1];
    };

    await Comment.destroy({ where: { id: commentId } });

    if (getComment.attachment) await deletePreviousCommentImage(commentPicture);

    res.status(201).json({ message: "Commentaire supprimé" });
  }
  catch (err) {
    res.status(400).json(err);
  }

};