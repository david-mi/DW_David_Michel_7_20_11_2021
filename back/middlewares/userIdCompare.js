const { User } = require('../models');

module.exports = async (req, res, next) => {

  try {

    const user = await User.findByPk(req.params.id);

    if (!user) throw ({ message: "Utilisateur non trouvé" });
    if (user.id !== req.token.USER_ID) throw ({ message: "Vous n'êtes pas le propriétaire de ce compte" });
    next();

  } catch (err) {
    return err.message && err.status
      ? res.status(err.status).json({ message: err.message })
      : res.status(400).json(err);
  }

};


