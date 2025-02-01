const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { User } = require("../models");
const CustomError = require("../utils/customError");
const errorMessages = require("../constants/errorMessages");

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

const loginUser = async (username, password) => {
  // Find the user by username
  const user = await User.findOne({ where: { username } });
  const validPassword = user?.password
    ? await bcrypt.compare(password, user?.password)
    : false;

  if (!user || !validPassword) {
    throw new CustomError(401, errorMessages.INVALID_USERNAME_OR_PASSWORD);
  }
  // if (!user) {
  //   throw new CustomError(401, errorMessages.INVALID_USERNAME);
  // }
  // console.log("COming Here", user);
  // Validate the password
  // const validPassword = await bcrypt.compare(password, user.password);
  // if (!validPassword) {
  //   throw new CustomError(401, errorMessages.INVALID_PASSWORD);
  // }

  // Generate a JWT with the user's ID and role
  const token = jwt.sign(
    { id: user.id, role: user.role },
    process.env.JWT_SECRET,
    { expiresIn: "1h" }
  );

  return token;
};

module.exports = { registerUser, loginUser };
