'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
     static associate({ Comment, Rating, WatchList}) {
         this.hasMany(Comment, { foreignKey: 'userId', onDelete: 'cascade', hooks: true });
         this.hasMany(Rating, { foreignKey: 'userId', onDelete: 'cascade', hooks: true });
         this.belongsTo(WatchList, {foreignKey: 'watchlistId'});

    }
  }
  User.init({
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false
    },
    role: {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: false
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        isEmail: {
          msg: "Nije email"
        }
      }
    }
  }, {
    sequelize,
    modelName: 'User',
  });
  return User;
};

