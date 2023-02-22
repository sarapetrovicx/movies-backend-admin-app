'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class MovieList extends Model {
    static associate({Movie}) {
      this.hasMany(Movie, { foreignKey: 'movielistId', hooks: true });
    }
  }
  MovieList.init({
  }, {
    sequelize,
    modelName: 'MovieList',
  });
  return MovieList;
};