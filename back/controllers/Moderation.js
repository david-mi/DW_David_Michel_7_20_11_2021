const { User } = require('../models/index');

exports.setModerator = async (req, res) => {

  try {
    const userId = req.params.id;
    const user = await User.findByPk(userId);

    if (user.status === 'moderator') throw ({ message: 'Cet utilisateur a déjà le status modérateur' });

    user.update({ status: 'moderator' });

    res.status(201).json({ message: 'Status modérateur ajouté !' });
  }
  catch (err) {
    res.status(500).json(err);
  }

};

exports.removeModerator = async (req, res) => {

  try {
    const userId = req.params.id;
    const user = await User.findByPk(userId);

    if (user.status === 'user') throw ({ message: 'Cet utilisateur a déjà le status utilisateur' });

    user.update({ status: 'user' });

    res.status(201).json({ message: 'Status modérateur retiré !' });
  }
  catch (err) {
    res.status(500).json(err);
  }

};


