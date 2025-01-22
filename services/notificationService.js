const { Notification, Follow } = require("../models");

const approveNotification = async (notificationId, adminId) => {
  // Find the notification and ensure it belongs to the admin
  const notification = await Notification.findOne({
    where: { id: notificationId, adminId },
  });

  if (!notification || notification.status !== "pending") {
    return null; // Notification not found or already processed
  }

  // Update the notification status to "approved"
  notification.status = "approved";
  await notification.save();

  // Add the user-admin relationship to the 'follows' table
  await Follow.create({
    userId: notification.userId,
    adminId: notification.adminId,
  });

  // Optionally Delete the notification from the Notification table after approval
  // await notification.destroy();

  return notification;
};

const rejectNotification = async (notificationId, adminId) => {
  // Find the notification by ID
  const notification = await Notification.findOne({
    where: {
      id: notificationId,
      adminId: adminId, // Ensure that the admin is authorized to reject this notification
    },
  });

  if (!notification) {
    throw new Error("Notification not found or unauthorized");
  }

  // Ensure the status is 'pending' before rejecting
  if (notification.status !== "pending") {
    throw new Error("Notification is not in a pending state");
  }

  // Update the notification status to 'rejected'
  notification.status = "rejected";
  await notification.save();

  //  Delete the notification after rejection (if required by your use case)
  await notification.destroy();

  return true; // Return true indicating that the notification was successfully rejected
};

const getNotifications = async (adminId) => {
  // Fetch all notifications for the specified admin
  const notifications = await Notification.findAll({
    where: { adminId, status: "pending" }, // Get only pending notifications
    order: [["createdAt", "DESC"]], // Sort by most recent notifications
  });

  // Check if notifications exist
  if (!notifications || notifications.length === 0) {
    return { message: "You do not have any pending notifications" };
  }

  return notifications;
};

module.exports = { approveNotification, rejectNotification, getNotifications };
