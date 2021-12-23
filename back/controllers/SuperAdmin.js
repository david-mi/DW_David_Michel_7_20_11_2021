// //! CONTROLLER TEMPORAIRE POUR FACILITER LES TESTS

const models = require('../models');
const Message = models.Message;
const User = models.User;


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