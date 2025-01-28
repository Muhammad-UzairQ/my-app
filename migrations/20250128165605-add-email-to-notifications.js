"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.addColumn("notifications", "email", {
      type: Sequelize.STRING,
      allowNull: false, // Or true depending on your needs
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.removeColumn("notifications", "email");
  },
};
