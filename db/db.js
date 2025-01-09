const { sequelize } = require("../models");

const connectDB = async () => {
  try {
    await sequelize.authenticate();
    console.log("Connected to Postgre SQL successfully!");
    await sequelize.sync({ force: false }); // Change force: true if you want to reset DB
    console.log("Database synced successfully!");
  } catch (error) {
    console.error("Error connecting to the Postgre SQL Database:", error);
    process.exit(1); // Exit process if the database connection fails
  }
};

module.exports = connectDB;
