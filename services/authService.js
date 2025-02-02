const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { User } = require("../models");
const CustomError = require("../utils/customError");
const errorMessages = require("../constants/errorMessages");

const registerUser = async (userData) => {
  const { username, password, email, role } = userData;

  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);

  const user = await User.create({
    username,
    password: hashedPassword,
    email,
    role,
  });

  const { password: _, ...userWithoutPassword } = user.toJSON();
  return userWithoutPassword;
};

const loginUser = async (username, password) => {
  const user = await User.findOne({ where: { username } });
  const validPassword = user?.password
    ? await bcrypt.compare(password, user?.password)
    : false;

  if (!user || !validPassword) {
    throw new CustomError(401, errorMessages.INVALID_USERNAME_OR_PASSWORD);
  }

  const token = jwt.sign(
    { id: user.id, role: user.role },
    process.env.JWT_SECRET,
    { expiresIn: "1h" }
  );

  return token;
};

module.exports = { registerUser, loginUser };
