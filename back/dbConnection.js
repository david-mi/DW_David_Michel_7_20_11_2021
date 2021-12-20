// connexion à la base de donnée mysql via sequelize

const Sequelize = require('sequelize');
const sequelize = new Sequelize(
  process.env.DB,
  'root',
  'adminMAMP',
  {
    dialect: 'mysql',
    host: 'localhost'
  });

try {
  sequelize.authenticate();
  console.log(`Connected on ${process.env.DB}`);
} catch (err) {
  console.error(`Failed to connect to ${process.env.DB}`, err);
}

module.exports = sequelize;

