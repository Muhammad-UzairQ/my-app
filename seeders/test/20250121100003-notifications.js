module.exports = {
  up: async (queryInterface, Sequelize) => {
    // Inserting sample notifications (pending follow requests) into the Notification table
    await queryInterface.bulkInsert(
      "notifications", // The name of your Notification table
      [
        {
          userId: 8,
          adminId: 2,
          status: "pending",
          createdAt: new Date(),
          updatedAt: new Date(),
          email: "test-admin2@example.com",
        },
        {
          userId: 8,
          adminId: 5,
          status: "pending",
          createdAt: new Date(),
          updatedAt: new Date(),
          email: "test-admin5@example.com",
        },
        // {
        //   id: 33,
        //   userId: 9,
        //   adminId: 2,
        //   status: "pending",
        //   createdAt: new Date(),
        //   updatedAt: new Date(),
        //   email: "test-admin2@example.com",
        // },
        // {
        //   userId: 9,
        //   adminId: 5,
        //   status: "pending",
        //   createdAt: new Date(),
        //   updatedAt: new Date(),
        //   email: "test-admin5@example.com",
        // },
        // {
        //   userId: 10,
        //   adminId: 2,
        //   status: "pending",
        //   createdAt: new Date(),
        //   updatedAt: new Date(),
        //   email: "test-admin2@example.com",
        // },
        // {
        //   userId: 10,
        //   adminId: 5,
        //   status: "pending",
        //   createdAt: new Date(),
        //   updatedAt: new Date(),
        //   email: "test-admin5@example.com",
        // },
      ],
      {}
    );
  },

  down: async (queryInterface, Sequelize) => {
    // Delete the seeded notifications to roll back the operation
    await queryInterface.bulkDelete("notifications", null, {});
  },
};
