const dotenv = require("dotenv");
const express = require("express");
const bodyParser = require("body-parser");
const authRoutes = require("./routes/auth");
const videoRoutes = require("./routes/video");
const followRoutes = require("./routes/follow");

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
app.use("/follow", followRoutes);

// Export the app instance
module.exports = app;
