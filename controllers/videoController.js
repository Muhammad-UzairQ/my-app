const videoService = require("../services/videoService");
const CustomError = require("../utils/customError");
const errorMessages = require("../constants/errorMessages");

const saveVideo = async (req, res) => {
  try {
    const { title, description, url, source, isPublic } = req.body;

    if (!req.user || req.user.role !== "admin") {
      throw new CustomError(403, errorMessages.ONLY_ADMINS_CAN_SAVE_VIDEOS);
    }

    const newVideo = await videoService.saveVideo({
      title,
      description,
      url,
      source,
      isPublic,
      adminId: req.user.id,
    });

    return res.status(201).json({
      message: "Video created successfully!",
      video: newVideo,
    });
  } catch (error) {
    console.error("Error saving video:", error.message);

    if (error instanceof CustomError) {
      return res.status(error.statusCode).json({ message: error.message });
    }

    return res
      .status(500)
      .json({ message: errorMessages.INTERNAL_SERVER_ERROR });
  }
};

const getVideos = async (req, res) => {
  try {
    const { adminId } = req.params;
    const { id: userId, role } = req.user;

    const videos = await videoService.getVideos({ adminId, userId, role });

    return res.status(200).json({ videos });
  } catch (error) {
    console.error("Error fetching videos:", error.message);

    if (error instanceof CustomError) {
      return res.status(error.statusCode).json({ message: error.message });
    }

    return res
      .status(500)
      .json({ message: errorMessages.INTERNAL_SERVER_ERROR });
  }
};

module.exports = { saveVideo, getVideos };
