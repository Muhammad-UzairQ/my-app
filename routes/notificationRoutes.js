const express = require("express");
const router = express.Router();
const {
  getNotifications,
  rejectNotifications,
  approveNotifications,
} = require("../controllers/notificationController");

const authMiddleware = require("../middleware/auth");

router.get("/", authMiddleware, getNotifications);
router.patch("/:notificationId/reject", authMiddleware, rejectNotifications);
router.patch("/:notificationId/approve", authMiddleware, approveNotifications);

module.exports = router;
