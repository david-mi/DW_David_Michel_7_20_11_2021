const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

// MODELS
const models = require('../models');
const User = models.User;

// TOOLS
const { profileParser } = require('../tools/jsonParser');
const { handleErrorImage, deletePreviousUserImage } = require('../tools/handleErrorImage');

const getdefaultUserPicture = (request) => {
  const name = 'default_profile_picture.jpg';
  return `${request.protocol}://${request.get('host')}/images/user/${name}`;
};

exports.getAllUsers = async (req, res) => {

  const users = await User.findAll()
    .catch(err => res.status(500).json(err));

  !users.length
    ? res.status(404).json({ message: "aucun utilisateur dans la bdd" })
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

    res.status(201).json({ message: `mail mis à jour. Nouvel email : ${newEmail}` });
  }

  catch (err) {
    res.status(400).json({ message: err.msg || err });
  }

};

exports.signup = async (req, res) => {

  try {
    const hash = await bcrypt.hash(req.body.password, 10);
    const user = await User.create({
      ...req.body,
      password: hash,
      profilePicture: getdefaultUserPicture(req),
      isAdmin: false
    });

    res.status(201).json({ Message: "Utilisateur créé", user });

  } catch (err) {
    res.status(400).json(err.errors[0].message);
    console.log(err);
  }

};

exports.login = async (req, res) => {

  try {
    const user = await User.findOne({ where: { email: req.body.email } });
    if (!user) return res.status(404).json({ message: 'Utilisateur non trouvé !' });

    const compare = await bcrypt.compare(req.body.password, user.password);
    if (!compare) return res.status(401).json({ message: 'Mauvais mot de passe !' });

    const payload = [{ USER_ID: user.id }, process.env.TOKEN_SECRET, { expiresIn: '24h' }];

    res.status(200).json({
      USER_ID: user.id,
      token: jwt.sign(...payload)
    });

  } catch (err) {
    res.send(err);
    console.log(err);
  }

};

exports.deleteUserImage = async (req, res) => {
  console.log('bonjour');
  try {
    const userId = req.token.USER_ID;
    const user = await User.findByPk(userId);
    const previousPicture = user.profilePicture.split('/images/user/')[1];
    console.log(previousPicture);

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

  try {
    await User.destroy({ where: { id: req.params.id } });
    res.status(201).json({ message: 'Utilisateur supprimé' });

  }
  catch (err) {
    res.status(500).json(err);
  }

};

