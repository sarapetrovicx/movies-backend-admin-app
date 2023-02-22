'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert('moviedirections',
    [
      {id:1, movieId:1, directorId:4, createdAt:new Date("2021-01-01"), updatedAt:new Date("2021-01-01")},
      {id:2, movieId:2, directorId:3, createdAt:new Date("2021-01-01"), updatedAt:new Date("2021-01-01")},
      {id:3, movieId:3, directorId:2, createdAt:new Date("2021-01-01"), updatedAt:new Date("2021-01-01")},
      {id:4, movieId:4, directorId:2, createdAt:new Date("2021-01-01"), updatedAt:new Date("2021-01-01")},
      {id:5, movieId:5, directorId:1, createdAt:new Date("2021-01-01"), updatedAt:new Date("2021-01-01")},

    ])
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('MovieDirection', null, {});
    
  }
};
