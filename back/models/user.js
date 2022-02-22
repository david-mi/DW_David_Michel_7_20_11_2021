'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    // static associate({ Message }) {
    //   this.hasMany(Message, {
    //     foreignKey: 'messageId',
    //     onDelete: 'cascade',
    //   });
    // }
  };
  User.init({
    email: { type: DataTypes.STRING, },
    password: {
      type: DataTypes.STRING,
    },
    username: DataTypes.STRING,
    firstname: DataTypes.STRING,
    lastname: DataTypes.STRING,
    bio: DataTypes.STRING,
    profilePicture: DataTypes.STRING,
    status: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'User',
  });
  return User;
};