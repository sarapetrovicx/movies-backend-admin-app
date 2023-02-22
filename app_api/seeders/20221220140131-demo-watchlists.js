'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert('watchlists',
    [
      {id:1, userId: 2, createdAt:new Date("2021-01-01"), updatedAt:new Date("2021-01-01")},
      {id:2, userId: 4, createdAt:new Date("2021-01-01"), updatedAt:new Date("2021-01-01")},
    ])
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('WatchList', null, {});
  }
};
