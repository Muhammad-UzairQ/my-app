const errorMessages = require("../constants/errorMessages");
const { Notification, Follow } = require("../models");
const CustomError = require("../utils/customError");

const approveNotification = async (notificationId, adminId) => {
  const notification = await Notification.findOne({
    where: { id: notificationId, adminId },
  });

  if (!notification || notification.status !== "pending") {
    throw new CustomError(404, errorMessages.NOTIFICATION_NOT_FOUND);
  }

  notification.status = "approved";
  await notification.save();

  await Follow.create({
    userId: notification.userId,
    adminId: notification.adminId,
  });

  // await notification.destroy();

  return notification;
};

const rejectNotification = async (notificationId, adminId) => {
  const notification = await Notification.findOne({
    where: { id: notificationId, adminId },
  });

  if (!notification || notification.status !== "pending") {
    throw new CustomError(404, errorMessages.NOTIFICATION_NOT_FOUND);
  }

  if (notification.status !== "pending") {
    throw new CustomError(400, errorMessages.NOTIFICATION_ALREADY_PROCESSED);
  }

  notification.status = "rejected";
  await notification.save();

  await notification.destroy();

  return true;
};

const getNotifications = async (adminId) => {
  const notifications = await Notification.findAll({
    where: { adminId, status: "pending" },
    order: [["createdAt", "DESC"]],
  });

  if (!notifications || notifications.length === 0) {
    throw new CustomError(404, errorMessages.NO_PENDINING_NOTIFICATION);
  }

  return notifications;
};

module.exports = { approveNotification, rejectNotification, getNotifications };
