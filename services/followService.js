const { Follow, User, Notification } = require("../models");

/**
 * Request to follow a user (admin) by the current user.
 * @param {number} userId - The ID of the logged-in user.
 * @param {number} adminId - The ID of the admin to be followed.
 * @returns {object} - The created notification record (pending follow request).
 * @throws {Error} - Throws an error if the admin or user doesn't exist or if there's another issue.
 */
const followUser = async (userId, adminId) => {
  // Check if the admin exists in the User table
  const admin = await User.findByPk(adminId);
  if (!admin) {
    throw new Error("Admin not found");
  }

  // Check if the user exists in the User table
  const user = await User.findByPk(userId);
  if (!user) {
    throw new Error("User not found");
  }

  // Check if the user is already following the admin
  const existingFollow = await Follow.findOne({ where: { userId, adminId } });
  if (existingFollow) {
    throw new Error("Already following this admin");
  }

  // Create a pending notification for the admin
  const notification = await Notification.create({
    userId, // Logged-in user's ID
    adminId, // The admin being followed
    status: "pending", // Notification status is 'pending' until approved by admin
  });

  return notification; // Return the created notification
};

/**
 * Unfollow a user (admin) by the current user.
 * @param {number} userId - The ID of the logged-in user.
 * @param {number} adminId - The ID of the admin to be unfollowed.
 * @returns {object} - The deleted follow record or a success message.
 * @throws {Error} - Throws an error if the admin or user doesn't exist, or if there's no follow relationship.
 */
const unfollowUser = async (userId, adminId) => {
  // Check if the admin exists in the User table
  const admin = await User.findByPk(adminId);
  if (!admin) {
    throw new Error("Admin not found");
  }

  // Check if the user exists in the User table
  const user = await User.findByPk(userId);
  if (!user) {
    throw new Error("User not found");
  }

  // Check if the user is following the admin (i.e., if a Follow record exists)
  const existingFollow = await Follow.findOne({ where: { userId, adminId } });
  if (!existingFollow) {
    throw new Error("You are not following this admin");
  }

  // Delete the follow relationship
  await existingFollow.destroy();

  // Optionally, delete the pending notification related to this follow request
  const notification = await Notification.findOne({
    where: { userId, adminId, status: "pending" },
  });
  if (notification) {
    await notification.destroy(); // Remove the pending notification
  }

  return { message: "Unfollowed successfully" };
};

module.exports = { followUser, unfollowUser };
