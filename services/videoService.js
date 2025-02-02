const fs = require("fs");
const csv = require("csv-parser");
const CustomError = require("../utils/customError");
const { Video, Follow, User } = require("../models");
const errorMessages = require("../constants/errorMessages");
const { publishVideoTask } = require("../queues/producers/videoProducer");

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

  await publishVideoTask({
    type: "SAVE_VIDEO",
    data: {
      id: newVideo.id,
      title: newVideo.title,
      url: newVideo.url,
      source: newVideo.source,
    },
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

const parseCSVFile = async (filePath, adminId) => {
  const validSources = ["facebook", "instagram"];
  const results = [];
  const errors = [];

  await new Promise((resolve, reject) => {
    fs.createReadStream(filePath)
      .pipe(csv())
      .on("headers", (headers) => {
        console.log("Headers:", headers); // Log the headers to verify
      })
      .on("data", (row) => {
        const { title, description, url, source, isPublic } = row;

        if (!title || !url || !source || !validSources.includes(source)) {
          errors.push({ row, error: errorMessages.INVALID_FIELDS });
          return;
        }

        results.push({
          title,
          description: description || null,
          url,
          source,
          isPublic: isPublic === "true",
          adminId,
        });
      })
      .on("end", resolve)
      .on("error", reject);
  });

  // Delete the file after processing
  fs.unlinkSync(filePath);

  return { results, errors };
};

const bulkInsertVideos = async ({ filePath, adminId }) => {
  const { results, errors } = await parseCSVFile(filePath, adminId);

  if (results.length > 0) {
    await Video.bulkCreate(results);
  }

  return { inserted: results.length, errors };
};

module.exports = { saveVideo, getVideos, bulkInsertVideos };
