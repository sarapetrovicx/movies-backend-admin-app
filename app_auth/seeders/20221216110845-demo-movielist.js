'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert('movielists',
    [ 
      {id:1,createdAt:new Date("2021-01-01"), updatedAt:new Date("2021-01-01")},
    ])
  },

  async down (queryInterface, Sequelize) {
  
    await queryInterface.bulkDelete('MovieList', null, {});
    
  }
};
