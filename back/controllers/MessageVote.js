
const { Message, MessageVote } = require('../models');

exports.showAllVotes = async (req, res) => {
  try {
    const votes = await MessageVote.findAll(({}));
    res.status(200).json(votes);
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

    const findVote = await MessageVote.findOne({ where: { userId, messageId } });

    if (findVote) {


      if (!findVote.isLiked) {
        await findVote.update({
          isLiked: true
        });
        return res.status(201).json({ message: 'Vote changé : like ajouté' });
      }

      await findVote.destroy();
      res.status(201).send({ message: 'Like enlevé' });
    } else {
      await MessageVote.create({ messageId, userId, isLiked: true });
      res.status(200).send({ message: 'Like ajouté' });
    }

  } catch (err) {

    switch (err.name) {
      case 'NoMessage':
        return res.status(404).json({ message: 'Message non trouvé' });
        break;
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

    const findVote = await MessageVote.findOne({ where: { userId, messageId } });

    if (findVote) {

      if (findVote.isLiked) {
        await findVote.update({
          isLiked: false
        });
        return res.status(201).json({ message: 'Vote changé : dislike ajouté' });
      }

      await findVote.destroy();
      res.status(201).send({ message: 'Dislike enlevé' });
    } else {
      await MessageVote.create({ messageId, userId, isLiked: false });
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
