const { Follow, User } = require("../models");

const followUser = async (req, res) => {
  const { adminId } = req.params; // Extract adminId from the URL
  const userId = req.user.id;

  try {
    // Step 1: Check if the adminId exists in the User table
    const admin = await User.findByPk(adminId);
    if (!admin) {
      return res.status(404).json({ message: "Admin not found" });
    }

    // Step 2: Check if the userId exists in the User table (optional, but good practice)
    const user = await User.findByPk(userId);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Step 3: Create a new follow record
    const follow = await Follow.create({
      userId: userId, // Logged-in user's ID (userId) follows the admin
      adminId: adminId, // adminId is the user being followed
    });

    // Step 4: Return a success response
    return res.status(201).json({
      message: "Followed successfully",
      follow,
    });
  } catch (error) {
    // Handle any unexpected errors
    console.error(error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

module.exports = { followUser };
