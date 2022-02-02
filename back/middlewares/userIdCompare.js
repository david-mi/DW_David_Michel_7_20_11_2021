const models = require('../models');
const User = models.User;

module.exports = async (req, res, next) => {

  try {

    const user = await User.findByPk(req.params.id);
    if (!user) return res.status(404).json({ Message: "Utilisateur non trouvé" });
    if (user.id !== req.token.USER_ID) return res.status(403).json({ Message: "Vous n'êtes pas le propriétaire de ce compte" });
    next();

  } catch (err) {
    res.send(err);
  }

};