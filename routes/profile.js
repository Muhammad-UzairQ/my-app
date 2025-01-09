const express = require("express");
const { getUserProfile, createUserProfile } = require("../controllers/profile");

const authMiddleware = require("../middleware/auth");

const router = express.Router();

router.post("/", authMiddleware, createUserProfile);
router.get("/", authMiddleware, getUserProfile);

module.exports = router;
