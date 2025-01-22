const followService = require("../services/followService");

const followUser = async (req, res) => {
  const { adminId } = req.params; // Extract adminId from the URL
  const userId = req.user.id; // Extract logged-in user's ID from the token

  try {
    // Call the service to handle the follow logic (now creates a pending notification)
    const notification = await followService.followUser(userId, adminId);

    // Return a success response
    return res.status(201).json({
      message: "Follow request sent successfully. Await admin approval.",
      notification,
    });
  } catch (error) {
    console.error("Error in followUser:", error.message);

    // Return an appropriate error response
    if (
      error.message === "Admin not found" ||
      error.message === "User not found"
    ) {
      return res.status(404).json({ message: error.message });
    }
    if (error.message === "Already following this admin") {
      return res.status(400).json({ message: error.message });
    }

    // Handle unexpected errors
    return res.status(500).json({ message: "Internal server error" });
  }
};

const unfollowUser = async (req, res) => {
  const { adminId } = req.params; // Extract the adminId from the URL
  const userId = req.user.id; // Extract the logged-in user's ID from the token

  try {
    // Call the service to handle the unfollow logic
    const result = await followService.unfollowUser(userId, adminId);

    // Return a success response
    return res.status(200).json({
      message: result.message,
    });
  } catch (error) {
    console.error("Error in unfollowUser:", error.message);

    // Return an appropriate error response
    if (
      error.message === "Admin not found" ||
      error.message === "User not found"
    ) {
      return res.status(404).json({ message: error.message });
    }
    if (error.message === "You are not following this admin") {
      return res.status(400).json({ message: error.message });
    }

    // Handle unexpected errors
    return res.status(500).json({ message: "Internal server error" });
  }
};

module.exports = { followUser, unfollowUser };
