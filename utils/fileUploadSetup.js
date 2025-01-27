const multer = require("multer");
const path = require("path");

// Set up multer storage configuration
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/"); // Save files to 'uploads' folder (ensure this folder exists)
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname)); // Append timestamp to file name to avoid duplicates
  },
});

// File filter to allow only CSV files
const fileFilter = (req, file, cb) => {
  if (file.mimetype === "text/csv") {
    cb(null, true); // Accept file
  } else {
    cb(new Error("Only CSV files are allowed"), false); // Reject file if not CSV
  }
};

// Set up multer middleware
const upload = multer({ storage, fileFilter });

module.exports = upload;
