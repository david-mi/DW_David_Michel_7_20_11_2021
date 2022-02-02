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
  const newData = profileParser(req.body.userInfos);

  try {

    if (req.files) {
      const { filename } = req.files.userPicture[0];

      const newPicture = `${req.protocol}://${req.get('host')}/images/user/${filename}`;

      const getUser = await User.findByPk(req.token.USER_ID);
      const previousPicture = getUser.profilePicture.split('/images/user/')[1];
      await User.update(
        { ...newData, profilePicture: newPicture },
        { where: { id: req.token.USER_ID } });

      if (previousPicture !== 'default_profile_picture.jpg') {
        fs.unlink(`images/user/${previousPicture}`, (err) => {
          if (err) throw (err);
          console.log('Ancienne image supprimée');
        });
      }

    }
    else {
      await User.update(
        { ...newData },
        { where: { id: req.token.USER_ID } });
    }
    res.status(201).json('Utilisateur mis à jour');
  }
  catch (err) {
    res.status(500).json(err);
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

