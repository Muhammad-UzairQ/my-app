const { Video, Follow, User } = require("../models");

const saveVideo = async ({
  title,
  description,
  url,
  source,
  isPublic,
  adminId,
}) => {
  // Validate required fields
  if (!title || !url || !source) {
    throw new Error("Title, URL, and source are required!");
  }

  // Validate the source
  const validSources = ["facebook", "instagram"];
  if (!validSources.includes(source)) {
    throw new Error(`Source must be one of: ${validSources.join(", ")}`);
  }

  // Create the video
  const newVideo = await Video.create({
    title,
    description: description || null, // Allow null descriptions
    url,
    source,
    isPublic: isPublic !== undefined ? isPublic : true, // Default to true if not provided
    adminId, // Associate video with the admin
  });

  return newVideo;
};

const getVideos = async ({ adminId, userId, role }) => {
  if (!adminId) {
    // If adminId is not provided and the user is not an admin
    if (role !== "admin") {
      throw new Error("Only admins can fetch their own videos.");
    }

    // Fetch all videos (public and private) for the requesting admin
    return await Video.findAll({
      where: { adminId: userId },
      order: [["createdAt", "DESC"]],
    });
  }

  // Check if the admin exists
  const adminExists = await User.findOne({
    where: { id: adminId, role: "admin" },
  });
  if (!adminExists) {
    throw new Error("Admin not found.");
  }

  // Check if the requesting user is the admin themselves
  if (userId === parseInt(adminId) && role === "admin") {
    // Admin is requesting their own videos
    return await Video.findAll({
      where: { adminId },
      order: [["createdAt", "DESC"]],
    });
  }

  // Check if the user is following the specified admin
  const isFollowing = await Follow.findOne({
    where: { userId, adminId },
  });
  if (!isFollowing) {
    throw new Error("You are not following this admin.");
  }

  // Fetch all public videos of the specified admin
  return await Video.findAll({
    where: { adminId, isPublic: true },
    order: [["createdAt", "DESC"]],
  });
};

module.exports = { saveVideo, getVideos };
