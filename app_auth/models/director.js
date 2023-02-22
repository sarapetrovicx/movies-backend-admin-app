'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Director extends Model {
    static associate({MovieDirection}) {
        this.hasMany(MovieDirection, { foreignKey: 'directorId', onDelete: 'cascade', hooks: true });
    }
  }
  Director.init({
    first_name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    last_name: {
      type: DataTypes.STRING,
      allowNull: false,
    }
  }, {
    sequelize,
    modelName: 'Director',
  });
  return Director;
};