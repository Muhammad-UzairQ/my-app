const cron = require("node-cron");
const {
  cleanupExpiredFollowRequests,
  notifyAdminsAboutPendingRequests,
} = require("../../schedulers");

cron.schedule("0 * * * *", async () => {
  console.log("Cleaning up expired follow requests...");
  await cleanupExpiredFollowRequests();
});

cron.schedule("0 8 * * *", async () => {
  console.log("Sending email to admin about pending follow requests...");
  await notifyAdminsAboutPendingRequests();
});

// cron.schedule("*/20 * * * * *", async () => {
//   console.log("Sending email to admin about pending follow requests...");
//   await notifyAdminsAboutPendingRequests();
// });
