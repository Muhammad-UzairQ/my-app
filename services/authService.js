const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { User } = require("../models");

/**
 * Registers a new user.
 * @param {object} userData - Contains username, password, email, and role.
 * @returns {object} - The created user without sensitive information.
 * @throws {Error} - Throws an error if registration fails.
 */
const registerUser = async (userData) => {
  const { username, password, email, role } = userData;

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

  // Exclude the password from the returned user object
  const { password: _, ...userWithoutPassword } = user.toJSON();
  return userWithoutPassword;
};

/**
 * Logs in a user.
 * @param {string} username - The username of the user.
 * @param {string} password - The password of the user.
 * @returns {string} - A JWT token if login is successful.
 * @throws {Error} - Throws an error if login fails.
 */
const loginUser = async (username, password) => {
  // Find the user by username
  const user = await User.findOne({ where: { username } });
  if (!user) {
    throw new Error("Invalid username or password");
  }

  // Validate the password
  const validPassword = await bcrypt.compare(password, user.password);
  if (!validPassword) {
    throw new Error("Invalid username or password");
  }

  // Generate a JWT with the user's ID and role
  const token = jwt.sign(
    { id: user.id, role: user.role },
    process.env.JWT_SECRET,
    { expiresIn: "1h" }
  );

  return token;
};

module.exports = { registerUser, loginUser };
