const authService = require("../services/authService");

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
  const { username, password } = req.body;

  // Validate input fields
  if (!username || !password) {
    return res
      .status(400)
      .send({ error: "Username and password are required" });
  }

  try {
    // Call the service to log in the user
    const token = await authService.loginUser(username, password);

    // Send the token in the response
    return res.status(200).send({ message: "Login successful", token });
  } catch (err) {
    // Handle login errors
    if (err.message === "Invalid username or password") {
      return res.status(400).send({ error: err.message });
    }

    // General error handling
    console.error("Error logging in user:", err);
    return res.status(500).send({
      error: "An error occurred while logging in",
      details: err.message,
    });
  }
};

module.exports = { registerUser, loginUser };
