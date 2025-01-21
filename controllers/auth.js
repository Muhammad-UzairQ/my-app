const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { User } = require("../models");

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
    // Hash the password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Create the user
    const user = await User.create({
      username,
      password: hashedPassword,
      email,
      role,
    });

    // Return the created user (excluding sensitive info)
    const { password: _, ...userWithoutPassword } = user.toJSON(); // Exclude the password from the response
    res.status(201).send(userWithoutPassword);
  } catch (err) {
    // Handle unique constraint errors (e.g., duplicate email or username)
    if (err.name === "SequelizeUniqueConstraintError") {
      return res
        .status(400)
        .send({ error: "Username or email already exists" });
    }
    // General error handling
    res.status(500).send({
      error: "An error occurred while creating the user",
      details: err.message,
    });
  }
};

const loginUser = async (req, res) => {
  const { username, password } = req.body;

  // Validate input fields
  if (!username || !password) {
    return res
      .status(400)
      .send({ error: "Username and password are required" });
  }

  try {
    // Find the user by username
    const user = await User.findOne({ where: { username } });
    if (!user) {
      return res.status(400).send({ error: "Invalid username or password" });
    }

    // Validate password
    const validPassword = await bcrypt.compare(password, user.password);
    if (!validPassword) {
      return res.status(400).send({ error: "Invalid username or password" });
    }

    // Generate a JWT with the user's ID and role
    const token = jwt.sign(
      { id: user.id, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: "1h" } // Optional: Set an expiration time for the token
    );

    // Send the token in the response
    res.status(200).send({ message: "Login successful", token });
  } catch (err) {
    console.error("Error logging in user:", err);
    res.status(500).send({
      error: "An error occurred while logging in",
      details: err.message,
    });
  }
};

module.exports = { registerUser, loginUser };
