// LIBRARIES
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

// MODELS
const { User } = require('../models');

// TOOLS
const { handleErrorImage, deletePreviousUserImage } = require('../tools/handleErrorImage');

/* fonction permettant de récupérer la photo de profil par défaut
de l'utilisateur stockée dans le dossier images/user */
const getdefaultUserPicture = (request) => {
  const name = 'default_profile_picture.jpg';
  return `${request.protocol}://${request.get('host')}/images/user/${name}`;
};

// 
exports.getAllUsers = async (req, res) => {

  const users = await User.findAll()
    .catch(err => res.status(500).json(err));

  !users.length
    ? res.status(404).json({ message: "Aucun utilisateur dans la base de donnée" })
    : res.status(200).json(users);

};

exports.showProfile = async (req, res) => {

  const user = await User.findByPk(
    req.params.id, {
    attributes: ['username', 'firstname', 'lastname', 'bio', 'profilePicture', 'isAdmin', 'createdAt'],
  }).catch((err) => res.status(500).json(err));

  if (!user) return res.status(404).json({ message: "Utilisateur non existant" });

  res.status(200).json(user);

};

exports.updateProfile = async (req, res) => {

  const { newData } = res.locals;

  try {

    if (req.file) {

      // on récupère l'image stockée par multer et on construit son URL
      const { filename } = req.file;
      const newPicture = `${req.protocol}://${req.get('host')}/images/user/${filename}`;

      // on cherche l'url de l'ancienne image de l'utilisateur puis on la stocke
      const getUser = await User.findByPk(req.token.USER_ID);
      const previousPicture = getUser.profilePicture.split('/images/user/')[1];

      // mise à jour de l'utilisateur
      await User.update(
        { ...newData, profilePicture: newPicture },
        { where: { id: req.token.USER_ID } });

      // on supprime l'ancienne image du dossier images sauf si c'était la photo par défaut 
      await deletePreviousUserImage(previousPicture);
    }
    else {
      // mise à jour de l'utilisateur sans photo
      await User.update(
        { ...newData },
        { where: { id: req.token.USER_ID } });
    }

    res.status(201).json({ message: 'Profil mis à jour' });

  }
  catch (err) {
    if (req.file && err.name !== 'unlink') await handleErrorImage(req, 'users');
    res.status(500).json(err);
  }
};

exports.mailUpdate = async (req, res) => {

  const { previousEmail, newEmail } = req.body;

  try {
    const user = await User.findByPk(req.token.USER_ID);

    if (user.email !== previousEmail) throw ('Ce mail ce correspond pas à votre mail actuel');
    if (user.email === newEmail) throw ("Le nouvel email est identique à l'ancien");

    await User.update(
      { email: newEmail },
      { where: { id: req.token.USER_ID } });

    res.status(201).json({ message: `Mail mis à jour. Nouvel email : ${newEmail}` });
  }

  catch (err) {
    res.status(400).json({ message: err.msg || err });
  }

};

exports.passwordUpdate = async (req, res) => {

  const { previousPw, newPw } = req.body;
  const token = req.token.USER_ID;
  const user = await User.findByPk(token);

  try {

    if (previousPw === newPw) throw ({ message: "Votre nouveau mot de passe est identique à l'ancien !" });

    const compare = await bcrypt.compare(previousPw, user.password);
    if (!compare) throw ({ message: 'Votre ancien mot de passe ne correspond pas !' });

    const hash = await bcrypt.hash(newPw, 10);
    await User.update(
      { password: hash },
      { where: { id: req.token.USER_ID } });

    res.status(201).json({ message: "Mot de passe mis à jour !" });
  }
  catch (err) {
    res.status(400).json(err);
  }

};

exports.signup = async (req, res) => {



  try {

    const isExisting = await User.findAll(
      { where: { email: req.body.email } }
    );
    if (isExisting.length) throw ('Cet email est déjà enregistré sur la base de donnée');

    const hash = await bcrypt.hash(req.body.password, 10);
    const user = await User.create({
      ...req.body,
      password: hash,
      profilePicture: getdefaultUserPicture(req),
      isAdmin: false
    });

    res.status(201).json({ Message: "Utilisateur créé", user });

  } catch (err) {
    if (err.errors) return res.status(400).json(err.errors[0].message);
    else return res.status(400).json(err);

  }

};

exports.login = async (req, res) => {

  try {
    const user = await User.findOne({ where: { email: req.body.email } });
    if (!user) return res.status(404).json({ message: 'Utilisateur non trouvé !' });

    const compare = await bcrypt.compare(req.body.password, user.password);
    if (!compare) return res.status(401).json({ message: 'Mauvais mot de passe !' });

    const payload = [
      { USER_ID: user.id, isAdmin: user.isAdmin },
      process.env.TOKEN_SECRET,
      { expiresIn: '24h' }
    ];

    res.status(200).json({ token: jwt.sign(...payload) });

  } catch (err) {
    res.send(err);
  }

};

exports.deleteUserImage = async (req, res) => {
  try {
    const userId = req.token.USER_ID;
    const user = await User.findByPk(userId);
    const previousPicture = user.profilePicture.split('/images/user/')[1];

    await deletePreviousUserImage(previousPicture);
    await User.update(
      { profilePicture: getdefaultUserPicture(req) },
      { where: { id: userId } }
    );

    res.status(201).json({ message: `L'image ${previousPicture} à bien été supprimée de votre profil` });
  }
  catch (err) {
    res.status(500).json(err);
  }
};

exports.deleteOneUser = async (req, res) => {

  const userId = req.params.id;

  try {

    const getUser = await User.findByPk(userId);
    const userPicture = getUser.profilePicture.split('/images/user/')[1];

    await User.destroy({ where: { id: userId } });
    await deletePreviousUserImage(userPicture);

    res.status(201).json({ message: 'Utilisateur supprimé' });

  }
  catch (err) {
    res.status(500).json(err);
  }

};

