const express = require("express");
const {
  saveVideo,
  getVideos,
  bulkInsertVideos,
} = require("../controllers/videoController");
const upload = require("../utils/fileUploadSetup");

const authMiddleware = require("../middleware/auth");

const router = express.Router();

router.post("/save", authMiddleware, saveVideo);

router.get("/:adminId?", authMiddleware, getVideos);

router.post(
  "/bulk-insert",
  authMiddleware, // Optional middleware for authentication
  upload.single("file"), // Use the 'file' field from the request body to handle the file upload
  bulkInsertVideos
);

module.exports = router;
