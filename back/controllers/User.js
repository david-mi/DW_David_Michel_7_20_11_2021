// const User = require('../models/user');
require('sequelize');
require('../dbConnection');
const models = require('../models');
const User = models.User;
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

exports.selectAllUsers = (req, res) => {

  User.findAll()
    .then(users => res.status(200).json(users))
    .catch(err => res.status(404).json(err));

};

exports.selectOneUser = (req, res) => {

  User.findOne({ where: { email: "mdr" } })
    .then(user => res.status(200).json(user))
    .catch(err => res.status(404).json(err));

};

exports.signup = async (req, res) => {

  try {
    const hash = await bcrypt.hash(req.body.password, 10);
    const user = await User.create({
      ...req.body,
      password: hash,
      isAdmin: false
    });
    res.status(201).json({ Message: "Utilisateur créé", user });

  } catch (err) {
    res.json(err);
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
      userId: user.id,
      token: jwt.sign(...payload)
    });

  } catch (err) {
    res.send(err);
  }

};