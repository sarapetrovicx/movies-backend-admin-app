'use strict';
const {
  Model, INTEGER
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Movie extends Model {
    
    static associate({MovieGenre, MovieDirection, Comment, MovieWatchList, MovieList}) {
      this.hasMany(MovieGenre, { foreignKey: 'movieId', onDelete: 'cascade', hooks: true });
      this.hasMany(MovieDirection, { foreignKey: 'movieId', onDelete: 'cascade', hooks: true });
      this.hasMany(Comment, { foreignKey: 'movieId', onDelete: 'cascade', hooks: true });
      this.hasMany(MovieWatchList, { foreignKey: 'movieId', onDelete: 'cascade', hooks: true });
      this.belongsTo(MovieList, {foreignKey: 'movielistId'});

    }
  }
  Movie.init({
    title: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true
    },
    year: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    duration: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    language: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    trailer:{
      type: DataTypes.STRING,
      allowNull: false,
    }
  }, {
    sequelize,
    modelName: 'Movie',
  });
  return Movie;
};