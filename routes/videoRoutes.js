const express = require("express");
const { saveVideo, getVideos } = require("../controllers/videoController");

const authMiddleware = require("../middleware/auth");

const router = express.Router();

router.post("/save", authMiddleware, saveVideo);

router.get("/:adminId?", authMiddleware, getVideos);

module.exports = router;
