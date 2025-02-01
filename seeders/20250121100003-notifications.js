module.exports = {
  up: async (queryInterface, Sequelize) => {
    // Inserting sample notifications (pending follow requests) into the Notification table
    await queryInterface.bulkInsert(
      "notifications", // The name of your Notification table
      [
        {
          id: 30,
          userId: 8, // The ID of the user who wants to follow
          adminId: 2, // The ID of the admin being followed
          status: "pending", // Status is initially 'pending'
          createdAt: new Date(),
          updatedAt: new Date(),
          email: "muhammaduzair111111@gmail.com",
        },
        // {
        //   userId: 8,
        //   adminId: 4,
        //   status: "pending",
        //   createdAt: new Date(),
        //   updatedAt: new Date(),
        //   email: "admin4@example.com",
        // },
        // {
        //   userId: 8,
        //   adminId: 5,
        //   status: "pending",
        //   createdAt: new Date(),
        //   updatedAt: new Date(),
        //   email: "admin5@example.com",
        // },
        {
          id: 31,
          userId: 9,
          adminId: 2,
          status: "pending",
          createdAt: new Date(),
          updatedAt: new Date(),
          email: "muhammaduzair111111@gmail.com",
        },
        // {
        //   userId: 9,
        //   adminId: 4,
        //   status: "pending",
        //   createdAt: new Date(),
        //   updatedAt: new Date(),
        //   email: "admin4@example.com",
        // },
        // {
        //   userId: 9,
        //   adminId: 5,
        //   status: "pending",
        //   createdAt: new Date(),
        //   updatedAt: new Date(),
        //   email: "admin5@example.com",
        // },
        {
          id: 32,
          userId: 10,
          adminId: 2,
          status: "pending",
          createdAt: new Date(),
          updatedAt: new Date(),
          email: "muhammaduzair111111@gmail.com",
        },
        // {
        //   userId: 10,
        //   adminId: 4,
        //   status: "pending",
        //   createdAt: new Date(),
        //   updatedAt: new Date(),
        //   email: "admin4@example.com",
        // },
        // {
        //   userId: 10,
        //   adminId: 5,
        //   status: "pending",
        //   createdAt: new Date(),
        //   updatedAt: new Date(),
        //   email: "admin5@example.com",
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
