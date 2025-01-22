const { Video, Follow, User } = require("../models");
const CustomError = require("../utils/customError");
const errorMessages = require("../constants/errorMessages");

const saveVideo = async ({
  title,
  description,
  url,
  source,
  isPublic,
  adminId,
}) => {
  if (!title || !url || !source) {
    throw new CustomError(400, errorMessages.MISSING_REQUIRED_FIELDS);
  }

  const validSources = ["facebook", "instagram"];
  if (!validSources.includes(source)) {
    throw new CustomError(
      400,
      `${errorMessages.INVALID_SOURCE}. Valid sources are: ${validSources.join(
        ", "
      )}`
    );
  }

  const newVideo = await Video.create({
    title,
    description: description || null,
    url,
    source,
    isPublic: isPublic !== undefined ? isPublic : true,
    adminId,
  });

  return newVideo;
};

const getVideos = async ({ adminId, userId, role }) => {
  if (!adminId) {
    if (role !== "admin") {
      throw new CustomError(403, errorMessages.ONLY_ADMINS_CAN_FETCH_VIDEOS);
    }

    return await Video.findAll({
      where: { adminId: userId },
      order: [["createdAt", "DESC"]],
    });
  }

  const adminExists = await User.findOne({
    where: { id: adminId, role: "admin" },
  });
  if (!adminExists) {
    throw new CustomError(404, errorMessages.ADMIN_NOT_FOUND);
  }

  if (userId === parseInt(adminId) && role === "admin") {
    return await Video.findAll({
      where: { adminId },
      order: [["createdAt", "DESC"]],
    });
  }

  const isFollowing = await Follow.findOne({
    where: { userId, adminId },
  });
  if (!isFollowing) {
    throw new CustomError(403, errorMessages.NOT_FOLLOWING);
  }

  return await Video.findAll({
    where: { adminId, isPublic: true },
    order: [["createdAt", "DESC"]],
  });
};

module.exports = { saveVideo, getVideos };
