const express = require("express");
const { followUser } = require("../controllers/followController");

const authMiddleware = require("../middleware/auth");

const router = express.Router();

router.post("/:adminId", authMiddleware, followUser);

module.exports = router;
