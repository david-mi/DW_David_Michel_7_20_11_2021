const models = require('../models');
const Message = models.Message;
const Like = models.Like;
const jwt = require('jsonwebtoken');
const { getMessages } = require('./SuperAdmin');

exports.showAllLikes = async (req, res) => {
  try {
    const likes = await Like.findAll(({

    }));
    res.status(200).json(likes);
  }
  catch (err) {
    res.status(400).json(err);
  }
};

exports.likeMessage = async (req, res) => {
  console.log('mdr');
  try {

    const userId = req.token.USER_ID;
    const messageId = req.params.id;

    const message = await Message.findByPk(messageId);
    if (!message) throw ({ name: 'NoMessage' });

    const findLike = await Like.findOne({ where: { userId, messageId } });

    if (findLike) {
      await findLike.destroy();
      res.status(201).send({ message: 'Like enlevé' });
    } else {
      await Like.create({ messageId, userId });
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

