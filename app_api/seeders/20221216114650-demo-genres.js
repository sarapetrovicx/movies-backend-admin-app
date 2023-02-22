'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert('genres',
    [
    {id:1, genre_name:"Action", createdAt:new Date("2021-01-01"), updatedAt:new Date("2021-01-01")},
    {id:2, genre_name:"Thriller", createdAt:new Date("2021-01-01"), updatedAt:new Date("2021-01-01")},
    {id:3, genre_name:"Crime", createdAt:new Date("2021-01-01"), updatedAt:new Date("2021-01-01")},
    {id:4, genre_name:"Drama", createdAt:new Date("2021-01-01"), updatedAt:new Date("2021-01-01")},
    {id:5, genre_name:"Dark comedy", createdAt:new Date("2021-01-01"), updatedAt:new Date("2021-01-01")},
    {id:6, genre_name:"Sci-fi", createdAt:new Date("2021-01-01"), updatedAt:new Date("2021-01-01")},
    {id:7, genre_name:"Adventure", createdAt:new Date("2021-01-01"), updatedAt:new Date("2021-01-01")},
    {id:8, genre_name:"Mystery", createdAt:new Date("2021-01-01"), updatedAt:new Date("2021-01-01")},
    {id:9, genre_name:"Heist", createdAt:new Date("2021-01-01"), updatedAt:new Date("2021-01-01")},
    {id:10, genre_name:"Indie", createdAt:new Date("2021-01-01"), updatedAt:new Date("2021-01-01")},
    ])
  },

  async down (queryInterface, Sequelize) {
    
    await queryInterface.bulkDelete('Genre', null, {});
     
  }
};
