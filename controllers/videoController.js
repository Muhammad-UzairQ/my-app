const CustomError = require("../utils/customError");
const videoService = require("../services/videoService");
const errorMessages = require("../constants/errorMessages");
const { BULK_INSERT_VIDEOS } = require("../queues/queueNames");
const { publishVideoTask } = require("../queues/producers/videoProducer");
const successMessages = require("../constants/successMessages");

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
      message: successMessages.VIDEO_SAVE_SUCCESS,
      video: newVideo,
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

const getVideos = async (req, res) => {
  try {
    const { adminId } = req.params;
    const { id: userId, role } = req.user;

    const videos = await videoService.getVideos({ adminId, userId, role });

    return res.status(200).json({ videos });
  } catch (error) {
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
    if (!req.file) {
      throw new CustomError(400, errorMessages.NO_FILE_UPLOADED);
    }

    const filePath = req.file.path;
    const adminId = req.user.id;

    // Publish the bulk insert task to RabbitMQ
    await publishVideoTask(BULK_INSERT_VIDEOS, {
      type: "BULK_INSERT_VIDEOS",
      data: { filePath, adminId },
    });

    return res.status(202).json({
      message: successMessages.FILE_UPLOAD_SUCCESS,
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

module.exports = { saveVideo, getVideos, bulkInsertVideos };
