'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert('ratings',
    [
      {id:1, rate: 10, userId: 1, movieId: 1, createdAt:new Date("2021-01-01"), updatedAt:new Date("2021-01-01")},
      {id:2, userId: 1, movieId: 2, rate: 9, createdAt:new Date("2021-01-01"), updatedAt:new Date("2021-01-01")},
      {id:3, userId: 2, movieId: 4, rate: 7, createdAt:new Date("2021-01-01"), updatedAt:new Date("2021-01-01")},
      {id:4, userId: 3, movieId: 5, rate: 8, createdAt:new Date("2021-01-01"), updatedAt:new Date("2021-01-01")},
      {id:5, userId: 4, movieId: 2, rate: 6, createdAt:new Date("2021-01-01"), updatedAt:new Date("2021-01-01")},
      {id:6, userId: 4, movieId: 1, rate: 9, createdAt:new Date("2021-01-01"), updatedAt:new Date("2021-01-01")},
      {id:7, userId: 5, movieId: 3, rate: 10, createdAt:new Date("2021-01-01"), updatedAt:new Date("2021-01-01")},
      {id:8, userId: 5, movieId: 4, rate: 8, createdAt:new Date("2021-01-01"), updatedAt:new Date("2021-01-01")},

    ])
  },

  async down (queryInterface, Sequelize) {
  
    await queryInterface.bulkDelete('Ratings', null, {});
   
  }
};
