// MODELS
const { Comment, CommentVote } = require('../models');

exports.showAllCommentsLikes = async (req, res) => {
  try {
    const commentVotes = await CommentVote.findAll(({}));
    res.status(200).json(commentVotes);
  }
  catch (err) {
    res.status(400).json(err);
  }
};

exports.likeComment = async (req, res) => {

  try {

    const userId = req.token.USER_ID;
    const commentId = req.params.id;

    const comment = await Comment.findByPk(commentId);
    if (!comment) throw ({ name: 'NoComment' });

    const findVote = await CommentVote.findOne({ where: { userId, commentId } });

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
      await CommentVote.create({ commentId, userId, isLiked: true });
      res.status(200).send({ message: 'Like ajouté' });
    }

  } catch (err) {

    switch (err.name) {
      case 'NoComment':
        return res.status(404).json({ message: 'Commentaire non trouvé' });
        break;
    }
    res.json(err);
  }

};


exports.dislikeComment = async (req, res) => {

  try {

    const userId = req.token.USER_ID;
    const commentId = req.params.id;

    const comment = await Comment.findByPk(commentId);
    if (!comment) throw ({ name: 'NoComment' });

    const findVote = await CommentVote.findOne({ where: { userId, commentId } });

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
      await CommentVote.create({ commentId, userId, isLiked: false });
      res.status(200).send({ message: 'Dislike ajouté' });
    }

  } catch (err) {

    switch (err.name) {
      case 'NoComment':
        return res.status(404).json({ message: 'Commentaire non trouvé' });
    }
    res.json(err);
  }

};
