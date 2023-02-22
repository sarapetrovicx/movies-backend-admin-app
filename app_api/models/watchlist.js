'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class WatchList extends Model {
     static associate({MovieWatchList, User}) {
      this.hasMany(MovieWatchList, { foreignKey: 'movieId', onDelete: 'cascade', hooks: true });
      this.belongsTo(User, { foreignKey: 'userId'});
    }
  }
  WatchList.init({
  }, {
    sequelize,
    modelName: 'WatchList',
  });
  return WatchList;
};