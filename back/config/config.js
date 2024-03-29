require('dotenv').config();

// config pour l'environement de développement
module.exports = {
  development: {
    username: process.env.DB_USERNAME,
    password: process.env.DB_PW,
    database: process.env.DB,
    host: process.env.DB_HOST,
    dialect: process.env.DB_DIALECT,
    port: process.env.DB_PORT,
    timezone: "+01:00",
    logging: false
  }
};