'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert('directors',
    [
      {id:1, first_name:"Darko", last_name:"Bajic",createdAt:new Date("2021-01-01"), updatedAt:new Date("2021-01-01")},
      {id:2, first_name:"Christopher", last_name:"Nolan",createdAt:new Date("2021-01-01"), updatedAt:new Date("2021-01-01")},
      {id:3, first_name:"Mathieu", last_name:"Kassovitz",createdAt:new Date("2021-01-01"), updatedAt:new Date("2021-01-01")},
      {id:4, first_name:"David", last_name:"Fincher",createdAt:new Date("2021-01-01"), updatedAt:new Date("2021-01-01")},

    ])
  },

  async down (queryInterface, Sequelize) {
   
    await queryInterface.bulkDelete('Director', null, {});
    
  }
};
