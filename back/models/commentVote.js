'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class CommentVote extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({ Comment, User }) {
      Comment.hasMany(this, { foreignKey: "commentId", onDelete: 'cascade' });
      this.belongsTo(User, { foreignKey: "userId", onDelete: 'cascade' });
    }
  };
  CommentVote.init({
    commentId: {
      type: DataTypes.INTEGER,
      references: {
        model: 'Comment',
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
    modelName: 'CommentVote',
  });
  return CommentVote;
};