// services/followService.js
const CustomError = require("../utils/customError");
const { Follow, User, Notification } = require("../models");
const errorMessages = require("../constants/errorMessages");
const successMessages = require("../constants/successMessages");

/**
 * Request to follow a user (admin) by the current user.
 */
const followUser = async (userId, adminId) => {
  const admin = await User.findByPk(adminId);
  if (!admin) {
    throw new CustomError(404, errorMessages.ADMIN_NOT_FOUND);
  }

  const user = await User.findByPk(userId);
  if (!user) {
    throw new CustomError(404, errorMessages.USER_NOT_FOUND);
  }

  const existingFollow = await Follow.findOne({ where: { userId, adminId } });
  if (existingFollow) {
    throw new CustomError(400, errorMessages.ALREADY_FOLLOWING);
  }

  const notification = await Notification.create({
    userId,
    adminId,
    status: "pending",
    email: admin.email,
  });

  return notification;
};

/**
 * Unfollow a user (admin) by the current user.
 */
const unfollowUser = async (userId, adminId) => {
  const admin = await User.findByPk(adminId);
  if (!admin) {
    throw new CustomError(404, errorMessages.ADMIN_NOT_FOUND);
  }

  const user = await User.findByPk(userId);
  if (!user) {
    throw new CustomError(404, errorMessages.USER_NOT_FOUND);
  }

  const existingFollow = await Follow.findOne({ where: { userId, adminId } });
  if (!existingFollow) {
    throw new CustomError(400, errorMessages.NOT_FOLLOWING);
  }

  await existingFollow.destroy();

  const notification = await Notification.findOne({
    where: { userId, adminId, status: "pending" },
  });
  if (notification) {
    await notification.destroy();
  }

  return { message: successMessages.UNFOLLOW_SUCCESS };
};

module.exports = { followUser, unfollowUser };
