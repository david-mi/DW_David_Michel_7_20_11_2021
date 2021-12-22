require('sequelize');
require('../dbConnection');
const models = require('../models');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const User = models.User;

exports.selectAllUsers = async (req, res) => {

  const users = await User.findAll()
    .catch(err => res.status(500).json(err));

  res.status(200).json(users);

};

exports.selectOneUser = async (req, res) => {

  const user = await User.findByPk(
    req.params.id, {
    attributes: ['username', 'firstname', 'lastname', 'bio', 'isAdmin', 'createdAt'],
  }).catch((err) => res.status(500).json(err));

  if (!user) return res.status(404).json({ message: "Utilisateur non existant" });

  res.status(500).json(user);

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
      USER_ID: user.id,
      token: jwt.sign(...payload)
    });

  } catch (err) {
    res.send(err);
  }

};

