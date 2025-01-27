const videoService = require("../services/videoService");
const CustomError = require("../utils/customError");
const errorMessages = require("../constants/errorMessages");
const { publishVideoTask } = require("../queues/producers/videoProducer");
const { BULK_INSERT_VIDEOS } = require("../queues/queueNames");

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

const bulkInsertVideos = async (req, res) => {
  try {
    // Check if the file is uploaded
    if (!req.file) {
      throw new CustomError(400, errorMessages.NO_FILE_UPLOADED);
    }

    const filePath = req.file.path; // File path for the uploaded CSV
    const adminId = req.user.id; // Admin ID from the authenticated user

    // Publish the bulk insert task to RabbitMQ
    await publishVideoTask(BULK_INSERT_VIDEOS, {
      type: "BULK_INSERT_VIDEOS",
      data: { filePath, adminId },
    });

    return res.status(202).json({
      message:
        "File uploaded successfully. Bulk insert processing has started.",
    });
  } catch (error) {
    console.error("Error in bulk insert controller:", error.message);

    if (error instanceof CustomError) {
      return res.status(error.statusCode).json({ message: error.message });
    }

    return res
      .status(500)
      .json({ message: errorMessages.INTERNAL_SERVER_ERROR });
  }
};

module.exports = { saveVideo, getVideos, bulkInsertVideos };
