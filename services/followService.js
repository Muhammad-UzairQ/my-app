const { Follow, User } = require("../models");

/**
 * Follow a user (admin) by the current user.
 * @param {number} userId - The ID of the logged-in user.
 * @param {number} adminId - The ID of the admin to be followed.
 * @returns {object} - The created follow record.
 * @throws {Error} - Throws an error if the admin or user doesn't exist or if there's another issue.
 */
const followUser = async (userId, adminId) => {
  // Step 1: Check if the admin exists in the User table
  const admin = await User.findByPk(adminId);
  if (!admin) {
    throw new Error("Admin not found");
  }

  // Step 2: Check if the user exists in the User table
  const user = await User.findByPk(userId);
  if (!user) {
    throw new Error("User not found");
  }

  // Step 3: Check if the follow relationship already exists to prevent duplicates
  const existingFollow = await Follow.findOne({ where: { userId, adminId } });
  if (existingFollow) {
    throw new Error("Already following this admin");
  }

  // Step 4: Create a new follow record
  const follow = await Follow.create({
    userId, // Logged-in user's ID
    adminId, // The admin being followed
  });

  return follow;
};

module.exports = { followUser };
