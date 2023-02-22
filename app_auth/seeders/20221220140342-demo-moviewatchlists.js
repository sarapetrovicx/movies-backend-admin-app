'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert('moviewatchlists',
    [
      {id:1, watchlistId: 1, movieId: 1, createdAt:new Date("2021-01-01"), updatedAt:new Date("2021-01-01")},
      {id:2, watchlistId: 1, movieId: 3, createdAt:new Date("2021-01-01"), updatedAt:new Date("2021-01-01")},
      {id:3, watchlistId: 1, movieId: 4, createdAt:new Date("2021-01-01"), updatedAt:new Date("2021-01-01")},


      {id:4, watchlistId: 2, movieId: 5, createdAt:new Date("2021-01-01"), updatedAt:new Date("2021-01-01")},
      {id:5, watchlistId: 2, movieId: 2, createdAt:new Date("2021-01-01"), updatedAt:new Date("2021-01-01")},

    ])
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('MovieWatchList', null, {});
  }
};
