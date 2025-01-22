const express = require("express");
const router = express.Router();
const {
  getNotifications,
  rejectNotifications,
  approveNotifications,
} = require("../controllers/notificationController");

const authMiddleware = require("../middleware/auth");

router.get("/", authMiddleware, getNotifications); // Admin gets notifications
router.patch("/:notificationId/reject", authMiddleware, rejectNotifications); // Admin rejects a notification
router.patch("/:notificationId/approve", authMiddleware, approveNotifications); // Admin approves a notification

module.exports = router;
