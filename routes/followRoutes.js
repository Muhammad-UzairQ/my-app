const express = require("express");
const { followUser, unfollowUser } = require("../controllers/followController");

const authMiddleware = require("../middleware/auth");

const router = express.Router();

router.post("/follow/:adminId", authMiddleware, followUser);
router.post("/unfollow/:adminId", authMiddleware, unfollowUser);

module.exports = router;
