'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert('comments',
    [
      {id:1, userId: 1, movieId: 1, content: "Great movie!" ,createdAt:new Date("2021-01-01"), updatedAt:new Date("2021-01-01")},
      {id:2, userId: 1, movieId: 2, content: "Boring movie!" ,createdAt:new Date("2021-01-01"), updatedAt:new Date("2021-01-01")},
      {id:3, userId: 2, movieId: 3, content: "Loved it!" ,createdAt:new Date("2021-01-01"), updatedAt:new Date("2021-01-01")},
      {id:4, userId: 2, movieId: 4, content: "Great plot twist!" ,createdAt:new Date("2021-01-01"), updatedAt:new Date("2021-01-01")},
      {id:5, userId: 4, movieId: 5, content: "Omiljeni film!" ,createdAt:new Date("2021-01-01"), updatedAt:new Date("2021-01-01")},
      {id:6, userId: 5, movieId: 2, content: "My favorite!" ,createdAt:new Date("2021-01-01"), updatedAt:new Date("2021-01-01")},

    ])
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Comments', null, {});
  }
};
