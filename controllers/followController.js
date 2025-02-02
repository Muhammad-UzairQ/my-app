// controllers/followController.js
const CustomError = require("../utils/customError");
const followService = require("../services/followService");
const successMessages = require("../constants/successMessages");

const followUser = async (req, res) => {
  const { adminId } = req.params;
  const userId = req.user.id;

  try {
    const notification = await followService.followUser(userId, adminId);
    return res.status(201).json({
      message: successMessages.FOLLOW_REQUEST_SENT,
      notification,
    });
  } catch (error) {
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
    if (error instanceof CustomError) {
      return res.status(error.statusCode).json({ message: error.message });
    }

    return res
      .status(500)
      .json({ message: errorMessages.INTERNAL_SERVER_ERROR });
  }
};

module.exports = { followUser, unfollowUser };
