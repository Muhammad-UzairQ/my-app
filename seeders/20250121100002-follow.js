"use strict";

module.exports = {
  async up(queryInterface, Sequelize) {
    // Insert sample follow relationships
    await queryInterface.bulkInsert("follows", [
      {
        userId: 6, // Replace with a valid user ID
        adminId: 1, // Replace with a valid admin ID
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        userId: 6, // Replace with a valid user ID
        adminId: 2, // Replace with a valid admin ID
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        userId: 6,
        adminId: 3,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        userId: 6,
        adminId: 4,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        userId: 6,
        adminId: 5,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        userId: 7,
        adminId: 1,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        userId: 7,
        adminId: 2,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        userId: 7,
        adminId: 3,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        userId: 7,
        adminId: 4,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        userId: 7,
        adminId: 5,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);
  },

  async down(queryInterface, Sequelize) {
    // Remove all follows inserted by this seeder
    await queryInterface.bulkDelete("follows", null, {});
  },
};
