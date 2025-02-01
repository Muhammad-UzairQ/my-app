"use strict";

module.exports = {
  async up(queryInterface, Sequelize) {
    const videos = [
      {
        title: "Introduction to Node.js",
        description:
          "Learn the basics of Node.js in this beginner-friendly tutorial.",
        url: "https://www.youtube.com/watch?v=nodejs1",
        source: "facebook",
        isPublic: true,
        adminId: 1, // Replace with an actual adminId from your users table
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        title: "Advanced Sequelize Tips",
        description: "Optimize your Sequelize queries with advanced tips.",
        url: "https://www.youtube.com/watch?v=sequelize1",
        source: "instagram",
        isPublic: false,
        adminId: 2, // Replace with an actual adminId
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        title: "React State Management",
        description: "Learn how to manage state effectively in React.",
        url: "https://www.youtube.com/watch?v=react1",
        source: "facebook",
        isPublic: true,
        adminId: 3,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        title: "Docker Basics",
        description: "A beginner's guide to containerization with Docker.",
        url: "https://www.youtube.com/watch?v=docker1",
        source: "instagram",
        isPublic: true,
        adminId: 4,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        title: "Microservices with Node.js",
        description: "Build scalable microservices using Node.js.",
        url: "https://www.youtube.com/watch?v=microservices1",
        source: "facebook",
        isPublic: false,
        adminId: 5,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        title: "CSS Grid Layout",
        description: "Master CSS grid layouts in this hands-on tutorial.",
        url: "https://www.youtube.com/watch?v=cssgrid1",
        source: "instagram",
        isPublic: false,
        adminId: 1,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        title: "Understanding REST APIs",
        description: "Learn the principles of RESTful API design.",
        url: "https://www.youtube.com/watch?v=restapi1",
        source: "facebook",
        isPublic: true,
        adminId: 2,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        title: "GraphQL for Beginners",
        description: "Get started with GraphQL in this introductory guide.",
        url: "https://www.youtube.com/watch?v=graphql1",
        source: "instagram",
        isPublic: false,
        adminId: 3,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        title: "Authentication in Express.js",
        description:
          "Secure your Express.js app with authentication techniques.",
        url: "https://www.youtube.com/watch?v=expressauth1",
        source: "facebook",
        isPublic: true,
        adminId: 4,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        title: "Kubernetes for Developers",
        description: "Deploy applications using Kubernetes.",
        url: "https://www.youtube.com/watch?v=kubernetes1",
        source: "instagram",
        isPublic: true,
        adminId: 5,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ];

    await queryInterface.bulkInsert("videos", videos);
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("videos", null, {});
  },
};
