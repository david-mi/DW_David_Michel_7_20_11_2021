require('dotenv').config();

module.exports = {
  up: async (queryInterface) => {

    await queryInterface.bulkInsert('users', [{
      id: 1,
      email: process.env.ADMIN_MAIL,
      password: process.env.ADMIN_PW,
      username: 'GroupoAdmin',
      firstname: 'Groupomania',
      lastname: 'Administrateur',
      bio: 'Administrateur de Groupomania',
      profilePicture: "http://localhost:3000/images/user/default_profile_picture.jpg",
      status: 'admin'
    }], {});

  },

  down: async (queryInterface) => {

    await queryInterface.bulkDelete('users', null, {});

  }
};
