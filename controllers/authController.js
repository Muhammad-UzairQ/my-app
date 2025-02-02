const CustomError = require("../utils/customError");
const authService = require("../services/authService");
const errorMessages = require("../constants/errorMessages");
const successMessages = require("../constants/successMessages");

/**
 * Controller for registering a new user.
 */
const registerUser = async (req, res) => {
  const { username, password, email, role } = req.body;

  if (!username || !password || !email || !role) {
    return res.status(400).send({ error: errorMessages.ALL_FIELDS_REQUIRED });
  }

  const validRoles = ["admin", "user"];
  if (!validRoles.includes(role)) {
    return res.status(400).send({ error: errorMessages.INVALID_ROLE });
  }

  try {
    const user = await authService.registerUser({
      username,
      password,
      email,
      role,
    });
    return res.status(201).send(user);
  } catch (err) {
    if (err.name === "SequelizeUniqueConstraintError") {
      return res.status(400).send({ error: errorMessages.USER_ALREADY_EXISTS });
    }

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

  if (!password) {
    return res.status(400).send({ error: errorMessages.PASSWORD_REQUIRED });
  }

  if (!username) {
    return res.status(400).send({ error: errorMessages.USERNAME_REQUIRED });
  }

  try {
    const token = await authService.loginUser(username, password);

    return res
      .status(200)
      .send({ message: successMessages.LOGIN_SUCCESS, token });
  } catch (error) {
    if (error instanceof CustomError) {
      return res.status(error.statusCode).json({ message: error.message });
    }

    return res
      .status(500)
      .json({ message: errorMessages.INTERNAL_SERVER_ERROR });
  }
};

module.exports = { registerUser, loginUser };
