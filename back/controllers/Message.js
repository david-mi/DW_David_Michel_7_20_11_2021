// MODELS
const { Message, User, MessageVote, Comment, CommentVote } = require('../models');

// TOOLS
const { handleErrorImage, deletePreviousPostImage } = require('../tools/handleImage');

exports.getAllMessages = async (req, res) => {

  try {
    const messages = await Message.findAll({
      attributes: ['id', 'text', 'attachment', 'createdAt', 'updatedAt'],
      include: [
        {
          model: User,
          attributes: ['id', 'username', 'firstname', 'lastname', 'status', 'profilePicture']
        },
        {
          model: MessageVote,
          attributes: ['id', 'isLiked'],
          include: [{
            model: User,
            attributes: [['id', 'userMessageVoted'], 'username', 'firstname', 'lastname']
          }]
        },
        {
          model: Comment,
          attributes: [['id', 'commentId'], 'messageId', 'text', 'attachment', 'createdAt', 'updatedAt'],
          include: [{
            model: User,
            attributes: ['id', 'username', 'firstname', 'lastname', 'status', 'profilePicture'],
          }, {
            model: CommentVote,
            attributes: ['id', 'isLiked'],
            include: [{
              model: User,
              attributes: [['id', 'userCommentVoted'], 'username', 'firstname', 'lastname']
            }]
          }],
        },
      ],
    });

    !messages.length
      ? res.status(200).json(null)
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

  try {

    const message = await Message.findByPk(req.params.id, {

      attributes: ['id', 'text', 'attachment', 'createdAt', 'updatedAt'],
      include: [
        { model: User, attributes: ['username', 'id'] },
        { model: MessageVote, attributes: ['id'], include: [{ model: User, attributes: [['username', 'pseudo']] }] }
      ],
    });
    message ? res.status(200).json(message) : res.status(404).json({ Message: "message non trouvé" });

  } catch (err) {
    res.send(err);
  }
};

exports.postMessage = async (req, res) => {

  const { newData } = res.locals;
  const userIdToken = req.token.USER_ID;

  try {

    if (req.file) {

      // on récupère l'image stockée par multer et on construit son URL
      const { filename } = req.file;
      const newPicture = `${req.protocol}://${req.get('host')}/images/post/${filename}`;

      const message = await Message.create(
        {
          ...newData,
          UserId: userIdToken,
          attachment: newPicture
        });

      res.status(201).json({ success: message });

    }

    else {

      const messageOnly = await Message.create(
        { ...newData, UserId: userIdToken });

      res.status(201).json({ success: messageOnly });

    }

  }
  catch (err) {
    if (req.file) await handleErrorImage(req, 'post');
    res.status(500).json(err);
  }

};

exports.editMessage = async (req, res) => {

  const { newData } = res.locals;
  const idMessage = req.params.id;

  try {

    if (req.file) {

      // on récupère l'image stockée par multer et on construit son URL
      const { filename } = req.file;
      const newPicture = `${req.protocol}://${req.get('host')}/images/post/${filename}`;

      // on cherche l'url de l'ancienne image de ce post puis on la stocke
      const getMessage = await Message.findByPk(idMessage);
      let previousPicture = '';

      if (getMessage.attachment) {
        previousPicture = getMessage.attachment.split('/images/post/')[1];
      };

      // mise à jour de l'utilisateur
      await Message.update(
        { ...newData, attachment: newPicture },
        { where: { id: idMessage } });

      // on supprime l'ancienne image du dossier images
      if (getMessage.attachment) await deletePreviousPostImage(previousPicture);
    }
    else {
      // mise à jour du post sans image
      await Message.update(
        { ...newData },
        { where: { id: idMessage } });
    }

    res.status(201).json({ message: 'Message mis à jour' });

  }
  catch (err) {
    if (req.file && err.name !== 'unlink') await handleErrorImage(req, 'post');
    res.status(500).json(err);
  }
};

exports.deleteMessageImage = async (req, res) => {

  try {
    const idMessage = req.params.id;
    const message = await Message.findByPk(idMessage);
    const previousPicture = message.attachment.split('/images/post/')[1];

    await deletePreviousPostImage(previousPicture);

    await Message.update(
      { attachment: null },
      { where: { id: idMessage } }
    );
    res.status(201).json({ message: `L'image ${previousPicture} à bien été supprimée du post` });
  }
  catch (err) {
    res.status(500).json(err);
  }

};

exports.deleteMessage = async (req, res) => {

  const messageId = req.params.id;
  const status = req.token.status;

  try {
    const getMessage = await Message.findByPk(messageId);

    let previousPicture = '';

    if (getMessage.attachment) {
      previousPicture = getMessage.attachment.split('/images/post/')[1];
    };
    await Message.destroy({ where: { id: messageId } });
    if (getMessage.attachment) await deletePreviousPostImage(previousPicture);
    res.status(201).json({ message: `Message supprimé par ${status}` });
  }
  catch (err) {
    res.status(400).json(err);
  }
};