'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class MovieGenre extends Model {
    static associate({Movie, Genre}) {
      this.belongsTo(Movie, {foreignKey: 'movieId'});
      this.belongsTo(Genre, {foreignKey: 'genreId'});
    }
  }
  MovieGenre.init({
  }, {
    sequelize,
    modelName: 'MovieGenre',
  });
  return MovieGenre;
};