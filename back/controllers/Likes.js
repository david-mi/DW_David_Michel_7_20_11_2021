// MODELS
const models = require('../models');
const Message = models.Message;
const Like = models.Like;

exports.showAllLikes = async (req, res) => {
  try {
    const likes = await Like.findAll(({}));
    res.status(200).json(likes);
  }
  catch (err) {
    res.status(400).json(err);
  }
};

exports.likeMessage = async (req, res) => {

  try {

    const userId = req.token.USER_ID;
    const messageId = req.params.id;

    const message = await Message.findByPk(messageId);
    if (!message) throw ({ name: 'NoMessage' });

    const findLike = await Like.findOne({ where: { userId, messageId } });

    if (findLike) {

      if (!findLike.isLiked) {
        await findLike.update({
          isLiked: true
        });
        return res.status(201).json({ message: 'Vote changé : like ajouté' });
      }

      await findLike.destroy();
      res.status(201).send({ message: 'Like enlevé' });
    } else {
      await Like.create({ messageId, userId, isLiked: true });
      res.status(200).send({ message: 'Like ajouté' });
    }

  } catch (err) {

    switch (err.name) {
      case 'NoMessage':
        return res.status(404).json({ message: 'Message non trouvé' });
    }
    res.json(err);
  }

};


exports.dislikeMessage = async (req, res) => {

  try {

    const userId = req.token.USER_ID;
    const messageId = req.params.id;

    const message = await Message.findByPk(messageId);
    if (!message) throw ({ name: 'NoMessage' });

    const findLike = await Like.findOne({ where: { userId, messageId } });

    if (findLike) {

      if (findLike.isLiked) {
        await findLike.update({
          isLiked: false
        });
        return res.status(201).json({ message: 'Vote changé : dislike ajouté' });
      }

      await findLike.destroy();
      res.status(201).send({ message: 'Dislike enlevé' });
    } else {
      await Like.create({ messageId, userId, isLiked: false });
      res.status(200).send({ message: 'Dislike ajouté' });
    }

  } catch (err) {

    switch (err.name) {
      case 'NoMessage':
        return res.status(404).json({ message: 'Message non trouvé' });
    }
    res.json(err);
  }

};
