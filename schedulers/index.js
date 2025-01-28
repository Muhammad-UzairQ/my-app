const { cleanupExpiredFollowRequests } = require("./cleanupSchedulers");
const {
  notifyAdminsAboutPendingRequests,
} = require("./notificationSchedulers");

// Export all schedulers in a single object
module.exports = {
  cleanupExpiredFollowRequests,
  notifyAdminsAboutPendingRequests,
};
