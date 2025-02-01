"use strict";
const bcrypt = require("bcrypt");

module.exports = {
  async up(queryInterface, Sequelize) {
    // Generate hashed passwords for all users
    const hashedPassword = await bcrypt.hash("password123", 10);

    // Create an array of 10 users (5 admins and 5 users)
    const users = [
      // Admins
      {
        id: 1,
        username: "test-admin1",
        email: "test-admin1@example.com",
        password: hashedPassword,
        role: "admin",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: 2,
        username: "test-admin2",
        email: "test-admin2@example.com",
        password: hashedPassword,
        role: "admin",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: 3,
        username: "test-admin3",
        email: "test-admin3@example.com",
        password: hashedPassword,
        role: "admin",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: 4,
        username: "test-admin4",
        email: "test-admin4@example.com",
        password: hashedPassword,
        role: "admin",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: 5,
        username: "test-admin5",
        email: "test-admin5@example.com",
        password: hashedPassword,
        role: "admin",
        createdAt: new Date(),
        updatedAt: new Date(),
      },

      // Regular Users
      {
        id: 6,
        username: "test-user1",
        email: "test-user1@example.com",
        password: hashedPassword,
        role: "user",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: 7,
        username: "test-user2",
        email: "test-user2@example.com",
        password: hashedPassword,
        role: "user",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: 8,
        username: "test-user3",
        email: "test-user3@example.com",
        password: hashedPassword,
        role: "user",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: 9,
        username: "test-user4",
        email: "test-user4@example.com",
        password: hashedPassword,
        role: "user",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: 10,
        username: "test-user5",
        email: "test-user5@example.com",
        password: hashedPassword,
        role: "user",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ];

    // Insert users into the database
    await queryInterface.bulkInsert("users", users);
  },

  async down(queryInterface, Sequelize) {
    // Remove all users inserted by this seeder
    await queryInterface.bulkDelete("users", null, {});
  },
};
