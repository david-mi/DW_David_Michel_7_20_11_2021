'use strict';
require('dotenv').config();
const fs = require('fs');
const path = require('path');
const { Sequelize } = require('sequelize');

const basename = path.basename(__filename);
const db = {};

// on définit quelle base de donnée listée dans le fichier config on veut utiliser
const env = process.env.CURRENT_DB;
const config = require(__dirname + '/../config/config.js')[env];

// on se connecte sur la base de donnée mysql via sequelize
let sequelize = new Sequelize({ ...config });

sequelize.authenticate()
  .then(() => console.log(`Connected on ${config.database}`))
  .catch((err) => console.log(`Failed to connect to ${config.database}`, err));

fs
  .readdirSync(__dirname)
  .filter(file => {
    return (file.indexOf('.') !== 0) && (file !== basename) && (file.slice(-3) === '.js');
  })
  .forEach(file => {
    const model = require(path.join(__dirname, file))(sequelize, Sequelize.DataTypes);
    db[model.name] = model;
  });

Object.keys(db).forEach(modelName => {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;

module.exports = db;
