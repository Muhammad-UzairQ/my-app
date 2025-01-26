const dotenv = require("dotenv");
const express = require("express");
const bodyParser = require("body-parser");
const authRoutes = require("./routes/authRoutes");
const videoRoutes = require("./routes/videoRoutes");
const followRoutes = require("./routes/followRoutes");
const notificationRoutes = require("./routes/notificationRoutes");
require("./workers/index");

dotenv.config();

const app = express();

// Middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Routes
app.get("/", (req, res) => {
  res.send("Welcome to the Node.js Boilerplate");
});

app.use("/auth", authRoutes);
app.use("/video", videoRoutes);
app.use("", followRoutes);
app.use("/notifications", notificationRoutes);

// Export the app instance
module.exports = app;
