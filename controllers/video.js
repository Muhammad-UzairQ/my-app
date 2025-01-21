const { Video, Follow, User } = require("../models");

const saveVideo = async (req, res) => {
  try {
    const { title, description, url, source, isPublic } = req.body;

    // Validate required fields
    if (!title || !url || !source) {
      return res
        .status(400)
        .json({ message: "Title, URL, and source are required!" });
    }

    // Check if the source is valid
    const validSources = ["facebook", "instagram"];
    if (!validSources.includes(source)) {
      return res
        .status(400)
        .json({ message: `Source must be one of: ${validSources.join(", ")}` });
    }
    console.log(req.user);
    // Check if the user is an admin (assuming `req.user` contains authenticated user info)
    if (!req.user || req.user.role !== "admin") {
      return res.status(403).json({ message: "Only admins can save videos." });
    }

    // Create the video
    const newVideo = await Video.create({
      title,
      description: description || null, // Allow null descriptions
      url,
      source,
      isPublic: isPublic !== undefined ? isPublic : true, // Default to true if not provided
      adminId: req.user.id, // Associate video with the logged-in admin
    });

    // Respond with success
    return res.status(201).json({
      message: "Video created successfully!",
      video: newVideo,
    });
  } catch (error) {
    console.error("Error saving video:", error);
    return res
      .status(500)
      .json({ message: "An error occurred while saving the video." });
  }
};

const getVideos = async (req, res) => {
  try {
    // Extract adminId from request params (optional)
    const { adminId } = req.params;

    // Extract userId and role from the JWT token (attached to req.user by auth middleware)
    const { id: userId, role } = req.user;

    // If adminId is not provided
    if (!adminId) {
      // Check if the requesting user is an admin
      if (role !== "admin") {
        return res
          .status(403)
          .send({ message: "Only admins can fetch their own videos." });
      }

      // Fetch all videos (public and private) for the requesting admin
      const videos = await Video.findAll({
        where: { adminId: userId },
        order: [["createdAt", "DESC"]], // Sort by newest first
      });

      return res.status(200).json({ videos });
    }

    // If adminId is provided
    // 1. Check if the admin exists
    const adminExists = await User.findOne({
      where: { id: adminId, role: "admin" },
    });

    if (!adminExists) {
      return res.status(404).send({ message: "Admin not found." });
    }

    // 2. Check if the requesting user is the admin themselves
    if (userId === parseInt(adminId) && role === "admin") {
      // Admin is requesting their own videos, return both public and private
      const videos = await Video.findAll({
        where: { adminId },
        order: [["createdAt", "DESC"]], // Sort by newest first
      });
      return res.status(200).json({ videos });
    }

    // 3. Check if the user is following the specified admin
    const isFollowing = await Follow.findOne({
      where: { userId, adminId },
    });

    if (!isFollowing) {
      return res
        .status(403)
        .send({ message: "You are not following this admin." });
    }

    // 4. Fetch all public videos of the specified admin
    const videos = await Video.findAll({
      where: { adminId, isPublic: true },
      order: [["createdAt", "DESC"]], // Sort by newest first
    });

    // 5. Return the videos in the response
    return res.status(200).json({ videos });
  } catch (err) {
    console.error("Error fetching videos:", err);
    return res.status(500).send({
      error: "An error occurred while retrieving videos",
      details: err.message,
    });
  }
};

module.exports = { saveVideo, getVideos };
