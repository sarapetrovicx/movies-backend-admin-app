'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert('moviegenres',
    [
      {id:1, movieId:1, genreId:1, createdAt:new Date("2021-01-01"), updatedAt:new Date("2021-01-01")},
      {id:2, movieId:1, genreId:2, createdAt:new Date("2021-01-01"), updatedAt:new Date("2021-01-01")},
      {id:3, movieId:1, genreId:3, createdAt:new Date("2021-01-01"), updatedAt:new Date("2021-01-01")},
      {id:4, movieId:1, genreId:4, createdAt:new Date("2021-01-01"), updatedAt:new Date("2021-01-01")},
      {id:5, movieId:1, genreId:5, createdAt:new Date("2021-01-01"), updatedAt:new Date("2021-01-01")},

      {id:6, movieId:2, genreId:2, createdAt:new Date("2021-01-01"), updatedAt:new Date("2021-01-01")},
      {id:7, movieId:2, genreId:4, createdAt:new Date("2021-01-01"), updatedAt:new Date("2021-01-01")},
      {id:8, movieId:2, genreId:3, createdAt:new Date("2021-01-01"), updatedAt:new Date("2021-01-01")},
      {id:9, movieId:2, genreId:10, createdAt:new Date("2021-01-01"), updatedAt:new Date("2021-01-01")},


      {id:10, movieId:3, genreId:6, createdAt:new Date("2021-01-01"), updatedAt:new Date("2021-01-01")},
      {id:11, movieId:3, genreId:4, createdAt:new Date("2021-01-01"), updatedAt:new Date("2021-01-01")},
      {id:12, movieId:3, genreId:7, createdAt:new Date("2021-01-01"), updatedAt:new Date("2021-01-01")},
      {id:13, movieId:3, genreId:8, createdAt:new Date("2021-01-01"), updatedAt:new Date("2021-01-01")},


      {id:14, movieId:4, genreId:1, createdAt:new Date("2021-01-01"), updatedAt:new Date("2021-01-01")},
      {id:15, movieId:4, genreId:2, createdAt:new Date("2021-01-01"), updatedAt:new Date("2021-01-01")},
      {id:16, movieId:4, genreId:6, createdAt:new Date("2021-01-01"), updatedAt:new Date("2021-01-01")},
      {id:17, movieId:4, genreId:7, createdAt:new Date("2021-01-01"), updatedAt:new Date("2021-01-01")},
      {id:18, movieId:4, genreId:9, createdAt:new Date("2021-01-01"), updatedAt:new Date("2021-01-01")},
      {id:19, movieId:4, genreId:10, createdAt:new Date("2021-01-01"), updatedAt:new Date("2021-01-01")},


      {id:20, movieId:5, genreId:4, createdAt:new Date("2021-01-01"), updatedAt:new Date("2021-01-01")},

    ])
  },

  async down (queryInterface, Sequelize) {
   
    await queryInterface.bulkDelete('MovieGenre', null, {});
     
  }
};
