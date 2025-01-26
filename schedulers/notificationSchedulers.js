const { Notification } = require("../models");
const { Op } = require("sequelize");
const CustomError = require("../utils/customError");
const errorMessages = require("../constants/errorMessages");

/**
 * Cleanup expired follow requests.
 * Removes notifications that have been in "pending" status for more than 7 days.
 */
const cleanupExpiredFollowRequests = async () => {
  const EXPIRATION_DAYS = 1; // Number of days before a notification expires
  const expirationDate = new Date();
  expirationDate.setDate(expirationDate.getDate() - EXPIRATION_DAYS);

  try {
    // Find and delete expired notifications
    const expiredNotifications = await Notification.destroy({
      where: {
        status: "pending", // Only clean up "pending" notifications
        createdAt: {
          [Op.lt]: expirationDate, // Notifications older than the expiration date
        },
      },
    });

    console.log(
      `${expiredNotifications} expired follow requests cleaned up successfully.`
    );

    return expiredNotifications;
  } catch (error) {
    console.error("Error cleaning up expired follow requests:", error);
    throw new CustomError(
      500,
      errorMessages.INTERNAL_SERVER_ERROR ||
        "Failed to clean up expired notifications."
    );
  }
};

module.exports = { cleanupExpiredFollowRequests };
