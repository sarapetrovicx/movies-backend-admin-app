'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Genre extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({MovieGenre}) {
      this.hasMany(MovieGenre, { foreignKey: 'genreId', onDelete: 'cascade', hooks: true });
    }
  }
  Genre.init({
    genre_name: {
      type: DataTypes.STRING,
      allowNull: false,
    }
  }, {
    sequelize,
    modelName: 'Genre',
  });
  return Genre;
};