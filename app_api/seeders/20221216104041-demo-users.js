'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert('users',
    [

      {id:1, name:"admin", password:"$2b$10$Qk603JaobinjjEbRGWy4heOjy.KVOCVflxyxyZ3tS9mdn7cPsfRQG", role:"admin", email: "admin@gmail.com", watchlistId: null, createdAt:new Date("2021-01-01"), updatedAt:new Date("2021-01-01")},
      {id:2, name:"user", password:"$2b$10$0UCVeJN2o4WzHUkt0mtvDOUjL1OP48OP2IKLs0T3ybtVTUc9n0hWm", role:"user", email: "user@gmail.com", watchlistId: 1, createdAt:new Date("2021-01-01"), updatedAt:new Date("2021-01-01")},
      {id:3, name:"moderator", password:"$2b$10$gDeKEhr0zuZ5yG.RzzTKIu3qekqHipyiUplDcUZF9tSTR8H6/nlH2", role:"moderator", email: "moderator@gmail.com", watchlistId: null, createdAt:new Date("2021-01-01"), updatedAt:new Date("2021-01-01")},
      {id:4, name:"anap", password:"$2b$10$NDCvcEbRCw458bqsUGSSJOlvSzkxjbVcIGxMDYfzg25fIBu9hf7yC", role:"user", email: "anap@gmail.com", watchlistId: 2, createdAt:new Date("2021-01-01"), updatedAt:new Date("2021-01-01")},
      {id:5, name:"pera", password:"$2b$10$OcwsCOIuVTIyKYT./p84VO8gfxbF7QXqTY.SStGkXjwvpHI2XyYi2", role:"moderator", email: "pera@gmail.com", watchlistId: null, createdAt:new Date("2021-01-01"), updatedAt:new Date("2021-01-01")}

    ])
  },

  async down (queryInterface, Sequelize) {
     await queryInterface.bulkDelete('User', null, {});
  }
};
