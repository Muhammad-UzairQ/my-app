const followService = require("../services/followService");

const followUser = async (req, res) => {
  const { adminId } = req.params; // Extract adminId from the URL
  const userId = req.user.id; // Extract logged-in user's ID from the token

  try {
    // Call the service to handle the follow logic
    const follow = await followService.followUser(userId, adminId);

    // Return a success response
    return res.status(201).json({
      message: "Followed successfully",
      follow,
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

module.exports = { followUser };
