'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class MovieDirection extends Model {
    static associate({Movie, Director}) {
      this.belongsTo(Movie, {foreignKey: 'movieId'});
      this.belongsTo(Director, {foreignKey: 'directorId'});
    }
  }
  MovieDirection.init({
  }, {
    sequelize,
    modelName: 'MovieDirection',
  });
  return MovieDirection;
};