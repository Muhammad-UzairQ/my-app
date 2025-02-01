const util = require("util");
const exec = util.promisify(require("child_process").exec);

const cron = require("node-cron");
const { sequelize } = require("./models");

// Mock node-cron
jest.mock("node-cron", () => {
  const originalModule = jest.requireActual("node-cron");
  return {
    ...originalModule,
    schedule: jest.fn(),
    getTasks: jest.fn(() => []),
  };
});

beforeAll(async () => {
  try {
    // Seed the test database
    await exec(
      "npx sequelize-cli db:seed:all --env test --seeders-path seeders/test",
      { stdio: "inherit" }
    );

    // Authenticate the database connection
    await sequelize.authenticate();
    console.log("Connected to the database successfully!");
  } catch (err) {
    console.error(`Seeder Error: ${err.message}`);
    throw err;
  }
});

afterAll(async () => {
  try {
    // Undo test seeders
    await exec(
      "npx sequelize-cli db:seed:undo:all --env test --seeders-path seeders/test"
    );
  } catch (err) {
    console.error(`Undo Seeder Error: ${err.message}`);
  }

  // Close the database connection
  await sequelize.close();

  // Stop all cron jobs to prevent Jest from hanging
  cron.getTasks().forEach((task) => task.stop());
});
