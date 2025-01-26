const cron = require("node-cron");
const {
  cleanupExpiredFollowRequests,
} = require("../../schedulers/notificationSchedulers");

cron.schedule("0 * * * *", async () => {
  console.log("Cleaning up expired follow requests...");
  await cleanupExpiredFollowRequests();
});
