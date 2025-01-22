module.exports = {
  up: async (queryInterface, Sequelize) => {
    // Inserting sample notifications (pending follow requests) into the Notification table
    await queryInterface.bulkInsert(
      "notifications", // The name of your Notification table
      [
        {
          userId: 8, // The ID of the user who wants to follow
          adminId: 3, // The ID of the admin being followed
          status: "pending", // Status is initially 'pending'
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          userId: 8,
          adminId: 4,
          status: "pending",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          userId: 8,
          adminId: 5,
          status: "pending",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          userId: 9,
          adminId: 3,
          status: "pending",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          userId: 9,
          adminId: 4,
          status: "pending",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          userId: 9,
          adminId: 5,
          status: "pending",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          userId: 10,
          adminId: 3,
          status: "pending",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          userId: 10,
          adminId: 4,
          status: "pending",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          userId: 10,
          adminId: 5,
          status: "pending",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ],
      {}
    );
  },

  down: async (queryInterface, Sequelize) => {
    // Delete the seeded notifications to roll back the operation
    await queryInterface.bulkDelete("notifications", null, {});
  },
};
