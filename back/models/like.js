'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Like extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({ Message, User }) {

      Message.hasMany(this, { foreignKey: "messageId", onDelete: 'cascade' });
      this.belongsTo(User, { foreignKey: "userId", onDelete: 'cascade' });
    }
  };
  Like.init({
    messageId: {
      type: DataTypes.INTEGER,
      references: {
        model: 'Message',
        key: 'id'
      }
    },
    userId: {
      type: DataTypes.INTEGER,
      references: {
        model: 'User',
        key: 'id'
      }
    },
    isLiked: {
      type: DataTypes.BOOLEAN
    }
  }, {
    sequelize,
    modelName: 'Like',
  });
  return Like;
};