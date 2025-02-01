const errorMessages = require("../constants/errorMessages");
const authService = require("../services/authService");
const CustomError = require("../utils/customError");

/**
 * Controller for registering a new user.
 */
const registerUser = async (req, res) => {
  const { username, password, email, role } = req.body;

  // Validate input fields
  if (!username || !password || !email || !role) {
    return res.status(400).send({ error: "All fields are required" });
  }

  // Ensure role is valid
  const validRoles = ["admin", "user"];
  if (!validRoles.includes(role)) {
    return res.status(400).send({ error: "Invalid role provided" });
  }

  try {
    // Call the service to register the user
    const user = await authService.registerUser({
      username,
      password,
      email,
      role,
    });
    return res.status(201).send(user);
  } catch (err) {
    // Handle unique constraint errors
    if (err.name === "SequelizeUniqueConstraintError") {
      return res
        .status(400)
        .send({ error: "Username or email already exists" });
    }

    // General error handling
    console.error("Error registering user:", err);
    return res.status(500).send({
      error: "An error occurred while creating the user",
      details: err.message,
    });
  }
};

/**
 * Controller for logging in a user.
 */
const loginUser = async (req, res) => {
  const { username = "", password = "" } = req.body;

  // Validate input fields
  if (!password) {
    return res.status(400).send({ error: "Password is required" });
  }

  if (!username) {
    return res.status(400).send({ error: "Username is required" });
  }

  try {
    // Call the service to log in the user
    const token = await authService.loginUser(username, password);

    // Send the token in the response
    return res.status(200).send({ message: "Login successful", token });
  } catch (error) {
    console.log("Error logging in:", error.message);
    if (error instanceof CustomError) {
      return res.status(error.statusCode).json({ message: error.message });
    }

    return res
      .status(500)
      .json({ message: errorMessages.INTERNAL_SERVER_ERROR });
  }
};

module.exports = { registerUser, loginUser };
