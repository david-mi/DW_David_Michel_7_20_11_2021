const bcrypt = require('bcrypt');
require('dotenv').config();

// création d'un compte administrateur, à appeler à la création de la base de donnée
module.exports = {
  up: async (queryInterface) => {

    const hash = await bcrypt.hash(process.env.ADMIN_PW, 10);

    await queryInterface.bulkInsert('users', [{
      id: 1,
      email: process.env.ADMIN_MAIL,
      password: hash,
      username: 'GA',
      firstname: 'Groupomania',
      lastname: 'Admin',
      bio: 'Administrateur de Groupomania',
      profilePicture: "http://localhost:3000/images/user/default_profile_picture.jpg",
      status: 'admin'
    }], {});

  },

  down: async (queryInterface) => {

    await queryInterface.bulkDelete('users', null, {});

  }
};
