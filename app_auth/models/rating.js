'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Rating extends Model {
    static associate({User, Movie}) {
      this.belongsTo(User, {foreignKey: 'userId'});
      this.belongsTo(Movie, {foreignKey: 'movieId'});
    }
  }
  Rating.init({
    rate: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  }, {
    sequelize,
    modelName: 'Rating',
  });
  return Rating;
};