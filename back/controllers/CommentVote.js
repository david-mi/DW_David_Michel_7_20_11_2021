// MODELS
const { Comment, CommentVote } = require('../models');

exports.likeComment = async (req, res) => {

  try {

    const userId = req.token.USER_ID;
    const commentId = req.params.id;

    // on cherche le commentaire associé, on renvoie un message d'erreur si non trouvé
    const comment = await Comment.findByPk(commentId);
    if (!comment) throw ({ name: 'NoComment' });

    const findVote = await CommentVote.findOne({ where: { userId, commentId } });

    if (findVote) {

      /* si un vote à été trouvé avec un dislike (isLiked = false), 
      on passe le isLiked à true pour transformer le dislike en like */
      if (!findVote.isLiked) {
        await findVote.update({ isLiked: true });
        return res.status(201).json({ message: 'Vote changé : like ajouté' });
      }

      /* si on trouve un vote comportant déjà un like (isLiked = true) on supprime le 
      vote */
      await findVote.destroy();
      res.status(201).send({ message: 'Like enlevé' });

    } else {

      // si aucun vote n'a été trouvé, on enregistre un like (isLiked = true)
      await CommentVote.create({ commentId, userId, isLiked: true });
      res.status(200).send({ message: 'Like ajouté' });
    }

  } catch (err) {

    if (err.name === 'NoComment') {
      return res.status(404).json({ message: 'Commentaire non trouvé' });
    }
    res.json(err);
  }

};


exports.dislikeComment = async (req, res) => {

  try {

    const userId = req.token.USER_ID;
    const commentId = req.params.id;

    // on cherche le commentaire associé, on renvoie un message d'erreur si non trouvé
    const comment = await Comment.findByPk(commentId);
    if (!comment) throw ({ name: 'NoComment' });

    // on cherche si un vote à déjà eté engistré dans la base de donnée
    const findVote = await CommentVote.findOne({ where: { userId, commentId } });

    if (findVote) {

      /* si un vote à été trouvé avec un like (isLiked = true), 
      on passe le isLiked à false pour transformer le like en dislike */
      if (findVote.isLiked) {
        await findVote.update({ isLiked: false });
        return res.status(201).json({ message: 'Vote changé : dislike ajouté' });
      }

      /* si on trouve un vote comportant déjà un dislike (isLiked = false) on supprime le 
      vote */
      await findVote.destroy();
      res.status(201).send({ message: 'Dislike enlevé' });


    } else {

      // si aucun vote n'a été trouvé, on enregistre un dislike (isLiked = false)      
      await CommentVote.create({ commentId, userId, isLiked: false });
      res.status(200).send({ message: 'Dislike ajouté' });
    }

  } catch (err) {

    if (err.name === 'NoComment') {
      return res.status(404).json({ message: 'Commentaire non trouvé' });
    }
    res.json(err);
  }

};
