'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Comment extends Model {
     static associate({ User, Movie }) {
      this.belongsTo(User, {foreignKey: 'userId'});
      this.belongsTo(Movie, {foreignKey: 'movieId'});
    }
  }
  Comment.init({
    content: {
      type: DataTypes.STRING(2048),
      allowNull: false
    }
  }, {
    sequelize,
    modelName: 'Comment',
  });
  return Comment;
};