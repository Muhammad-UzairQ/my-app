// controllers/followController.js
const followService = require("../services/followService");
const CustomError = require("../utils/customError");

const followUser = async (req, res) => {
  const { adminId } = req.params;
  const userId = req.user.id;

  try {
    const notification = await followService.followUser(userId, adminId);
    return res.status(201).json({
      message: "Follow request sent successfully. Await admin approval.",
      notification,
    });
  } catch (error) {
    console.error("Error in followUser:", error.message);

    if (error instanceof CustomError) {
      return res.status(error.statusCode).json({ message: error.message });
    }

    return res
      .status(500)
      .json({ message: errorMessages.INTERNAL_SERVER_ERROR });
  }
};

const unfollowUser = async (req, res) => {
  const { adminId } = req.params;
  const userId = req.user.id;

  try {
    const result = await followService.unfollowUser(userId, adminId);
    return res.status(200).json({ message: result.message });
  } catch (error) {
    console.error("Error in unfollowUser:", error.message);

    if (error instanceof CustomError) {
      return res.status(error.statusCode).json({ message: error.message });
    }

    return res
      .status(500)
      .json({ message: errorMessages.INTERNAL_SERVER_ERROR });
  }
};

module.exports = { followUser, unfollowUser };
