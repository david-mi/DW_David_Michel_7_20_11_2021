const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const fs = require('fs');

// MODELS
const models = require('../models');
const User = models.User;

// TOOLS
const { profileParser } = require('../tools/jsonParser');

exports.showProfile = async (req, res) => {

  const user = await User.findByPk(
    req.params.id, {
    attributes: ['username', 'firstname', 'lastname', 'bio', 'profilePicture', 'isAdmin', 'createdAt'],
  }).catch((err) => res.status(500).json(err));

  if (!user) return res.status(404).json({ message: "Utilisateur non existant" });

  res.status(200).json(user);

};

exports.updateProfile = async (req, res) => {
  // console.log('req.body');
  // console.log(req.body.userInfos);
  // console.log('req.files');
  // console.log(req.files);
  // const newData = JSON.parse(req.body.userInfos);
  // console.log(newData);
  // console.log('-------- AVANT PLANTAGE -----------');
  console.log('res locals');
  console.log(res.locals);
  const { newData } = res.locals;
  try {

    console.log('----- try----------');
    if (req.files.userPicture) {
      console.log('--------------FILES----------');


      console.log(req.files.userPicture);
      // on récupère l'image stockée par multer et on construit son URL
      const { filename } = req.files.userPicture[0];
      const newPicture = `${req.protocol}://${req.get('host')}/images/user/${filename}`;

      // on cherche l'url de l'ancienne image de l'utilisateur puis on la stocke
      const getUser = await User.findByPk(req.token.USER_ID);
      const previousPicture = getUser.profilePicture.split('/images/user/')[1];

      await User.update(
        { ...newData, profilePicture: newPicture },
        { where: { id: req.token.USER_ID } });

      // on supprime l'ancienne image du dossier images sauf si c'était la photo par défaut  
      if (previousPicture !== 'default_profile_picture.jpg') {
        fs.unlink(`images/user/${previousPicture}`, (err) => {
          if (err) throw (err);
        });
      }
    }
    else {
      console.log('----------NO FILES------------');
      await User.update(
        { ...newData },
        { where: { id: req.token.USER_ID } });
    }
    res.status(201).json({ message: 'Profil mis à jour' });
  }
  catch (err) {
    res.status(500).send(err);
  }
};

exports.signup = async (req, res) => {

  try {
    const hash = await bcrypt.hash(req.body.password, 10);
    const user = await User.create({
      ...req.body,
      password: hash,
      profilePicture: 'http://localhost:3000/images/user/default_profile_picture.jpg',
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

exports.deleteOneUser = async (req, res) => {

  await User.destroy({ where: { id: req.params.id } })
    .catch(err => res.status(500).json(err));

  res.status(201).json({ message: 'Utilisateur supprimé' });

};

