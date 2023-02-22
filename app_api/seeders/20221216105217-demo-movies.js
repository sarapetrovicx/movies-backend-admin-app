'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert('movies',
    [

      {id:1, title:"Fight Club", year:1999, duration:"2h 19m", language: "English", movielistId: 1, trailer: "https://www.youtube.com/embed/qtRKdVHc-cE",createdAt:new Date("2021-01-01"), updatedAt:new Date("2021-01-01")},
      {id:2, title:"La Haine", year:1995, duration:"1h 38m", language: "French", movielistId: 1, trailer: "https://www.youtube.com/embed/FKwcXt3JIaU", createdAt:new Date("2021-01-01"), updatedAt:new Date("2021-01-01")},
      {id:3, title:"Interstellar", year:2014, duration:"2h 49m", language: "English", movielistId: 1, trailer:"https://www.youtube.com/embed/zSWdZVtXT7E", createdAt:new Date("2021-01-01"), updatedAt:new Date("2021-01-01")},
      {id:4, title:"Inception", year:2010, duration:"2h 28m", language: "English", movielistId: 1, trailer:"https://www.youtube.com/embed/YoHD9XEInc0", createdAt:new Date("2021-01-01"), updatedAt:new Date("2021-01-01")},
      {id:5, title:"Crni Bombarder", year:1992, duration:"1h 56m", language: "Serbian", movielistId: 1, trailer:"https://www.youtube.com/embed/gRCEm61s6QM", createdAt:new Date("2021-01-01"), updatedAt:new Date("2021-01-01")},

    ])
  },

  async down (queryInterface, Sequelize) {
    
    await queryInterface.bulkDelete('Movie', null, {});
    
  }
};
