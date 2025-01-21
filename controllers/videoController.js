const videoService = require("../services/videoService");

const saveVideo = async (req, res) => {
  try {
    const { title, description, url, source, isPublic } = req.body;

    // Ensure the user is an admin
    if (!req.user || req.user.role !== "admin") {
      return res.status(403).json({ message: "Only admins can save videos." });
    }

    // Call the service to save the video
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
    console.error("Error saving video:", error);
    return res.status(500).json({ message: error.message });
  }
};

const getVideos = async (req, res) => {
  try {
    // Extract adminId from request params (optional)
    const { adminId } = req.params;

    // Extract userId and role from the JWT token
    const { id: userId, role } = req.user;

    // Call the service to fetch videos
    const videos = await videoService.getVideos({ adminId, userId, role });

    return res.status(200).json({ videos });
  } catch (error) {
    console.error("Error fetching videos:", error);
    return res.status(500).json({ message: error.message });
  }
};

module.exports = { saveVideo, getVideos };
