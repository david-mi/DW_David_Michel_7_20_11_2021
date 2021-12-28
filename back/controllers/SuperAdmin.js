// //! CONTROLLER TEMPORAIRE POUR FACILITER LES TESTS

const models = require('../models');
const Message = models.Message;
const User = models.User;


//* VOIR TOUS LES MESSAGES AVEC TOUTES LES INFOS *//

exports.getMessages = async (req, res) => {

  try {
    const messages = await Message.findAll();
    !messages.length
      ? res.status(404).json({ message: "Aucun message dans la base de donnée" })
      : res.status(200).json(messages);
  } catch (err) {
    res.send(err);
  }
};

//*  VOIR TOUS LES UTILISATEURS AVEC TOUTES LES INFOS *//

exports.getAllUsers = async (req, res) => {

  const users = await User.findAll()
    .catch(err => res.status(500).json(err));

  res.status(200).json(users);

};

//* SUPPRIMER TOUS LES MESSAGES  🤠🤠🤠

exports.deleteAllMessage = (req, res) => {
  Message.destroy({ where: {} })
    .then(nb => res.status(201).send({ message: `Tous les messages de la db ont été supprimés 🤣 🤣 🤣 🤣 . TOTAL: ${nb}` }))
    .catch(err => res.status(401).json(err));
};

//? SUPPRIMER TOUS LES UTILISATEURS 🤠🤠🤠

exports.deleteAllUsers = (req, res) => {
  User.destroy({ where: {} })
    .then(nb => res.status(201).json({ message: `Tous les utilisateurs de la db ont été supprimés. 🤣 🤣 🤣 🤣  TOTAL: ${nb}` }))
    .catch(err => res.status(401).json(err));
};