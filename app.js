const dotenv = require("dotenv");
const express = require("express");
const bodyParser = require("body-parser");
const authRoutes = require("./routes/auth");
const profileRoutes = require("./routes/profile");

dotenv.config();

const app = express();

// Middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Routes
app.use("/auth", authRoutes);
app.get("/", (req, res) => {
  res.send("Welcome to the Node.js Boilerplate");
});
app.use("/profile", profileRoutes);

// Export the app instance
module.exports = app;
