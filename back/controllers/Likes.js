const models = require('../models');
const Message = models.Message;
const Like = models.Like;
const jwt = require('jsonwebtoken');
const { getMessages } = require('./SuperAdmin');

exports.likeMessage = async (req, res) => {



  try {

    if (!req.headers.authorization) throw ({ name: 'NoToken' });
    const token = req.headers.authorization.split(' ')[1];
    req.token = jwt.verify(token, process.env.TOKEN_SECRET);
    const userId = req.token.USER_ID;

    const messageId = req.params.id;
    const message = await Message.findByPk(messageId);
    if (!message) throw ({ name: 'NoMessage' });

    console.log({
      userId,
      message: message.dataValues
    });

    const hasLiked = await Like.findOne({
      where: {
        userId: userId,
        messageId: messageId
      }
    });

    if (hasLiked) {
      const removeLike = await message.update({
        likes: message.like - 1
      });
      await hasLiked.destroy();
      res.status(201).json('Like enlevé');
    } else {
      const newLike = await Like.create({
        messageId, userId
      });
      console.log(newLike);
      const addLike = await message.update({
        likes: message.likes + 1
      });
      res.status(200).json(addLike);
    }










  } catch (err) {

    switch (err.name) {
      case 'NoToken':
        return res.status(401).send('Requête non authentifiée');
      case 'JsonWebTokenError':
        return res.status(401).send('Requête non authorisée');
      case 'NoMessage':
        return res.status(404).send('Message non trouvé');
      case 'AlreadyLiked':
        return res.status(409).send('Cet utilisateur à déjà liké ce message');
    }
    // if (err.name === 'JsonWebTokenError') 
    // if (err.name === 'NoMessage') return res.status(404).send('Message non trouvé');
    // if (err.name === 'AlreadyLiked') return res.status(409).send('Cet utilisateur à déjà liké ce message');
    res.json(err);

  }



};

// exports.dislikeMessage = (req, res) => {

// };