'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class MovieWatchList extends Model {
    static associate({Movie, WatchList}) {
      this.belongsTo(Movie, {foreignKey: 'movieId'});
      this.belongsTo(WatchList, {foreignKey: 'watchlistId'});
    }
  }
  MovieWatchList.init({
  }, {
    sequelize,
    modelName: 'MovieWatchList',
  });
  return MovieWatchList;
};