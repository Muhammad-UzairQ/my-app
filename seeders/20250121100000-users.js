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
        username: "admin1",
        email: "admin1@example.com",
        password: hashedPassword,
        role: "admin",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: 2,
        username: "Muhammad Uzair",
        email: "muhammaduzair111111@gmail.com",
        password: hashedPassword,
        role: "admin",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: 3,
        username: "admin3",
        email: "admin3@example.com",
        password: hashedPassword,
        role: "admin",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: 4,
        username: "admin4",
        email: "admin4@example.com",
        password: hashedPassword,
        role: "admin",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: 5,
        username: "admin5",
        email: "admin5@example.com",
        password: hashedPassword,
        role: "admin",
        createdAt: new Date(),
        updatedAt: new Date(),
      },

      // Regular Users
      {
        id: 6,
        username: "user1",
        email: "user1@example.com",
        password: hashedPassword,
        role: "user",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: 7,
        username: "user2",
        email: "user2@example.com",
        password: hashedPassword,
        role: "user",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: 8,
        username: "user3",
        email: "user3@example.com",
        password: hashedPassword,
        role: "user",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: 9,
        username: "user4",
        email: "user4@example.com",
        password: hashedPassword,
        role: "user",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: 10,
        username: "user5",
        email: "user5@example.com",
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
