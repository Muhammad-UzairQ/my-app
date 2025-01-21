const express = require("express");
const { followUser } = require("../controllers/follow");

const authMiddleware = require("../middleware/auth");

const router = express.Router();

router.post("/:adminId", authMiddleware, followUser);

module.exports = router;
