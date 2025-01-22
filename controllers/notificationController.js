const CustomError = require("../utils/customError");
const notificationService = require("../services/notificationService");

const approveNotifications = async (req, res) => {
  const { notificationId } = req.params;
  const { id: adminId, role } = req.user;

  if (role !== "admin") {
    return res
      .status(403)
      .json({ message: "You are not authorized to approve notifications" });
  }

  try {
    const result = await notificationService.approveNotification(
      notificationId,
      adminId
    );

    if (!result) {
      throw new CustomError("Notification not found", 404);
    }

    return res
      .status(200)
      .json({ message: "Notification approved successfully" });
  } catch (error) {
    if (error instanceof CustomError) {
      return res.status(error.statusCode).json({ message: error.message });
    }
    return res
      .status(500)
      .json({ message: errorMessages.INTERNAL_SERVER_ERROR });
  }
};

const rejectNotifications = async (req, res) => {
  const { notificationId } = req.params;
  const { id: adminId, role } = req.user;

  if (role !== "admin") {
    return res
      .status(403)
      .json({ message: "You are not authorized to reject notifications" });
  }

  try {
    const result = await notificationService.rejectNotification(
      notificationId,
      adminId
    );

    if (!result) {
      throw new CustomError("Notification not found", 404);
    }

    return res
      .status(200)
      .json({ message: "Notification rejected successfully" });
  } catch (error) {
    if (error instanceof CustomError) {
      return res.status(error.statusCode).json({ message: error.message });
    }
    return res
      .status(500)
      .json({ message: errorMessages.INTERNAL_SERVER_ERROR });
  }
};

const getNotifications = async (req, res) => {
  const { id: adminId, role } = req.user;

  if (role !== "admin") {
    return res
      .status(403)
      .json({ message: "You are not authorized to access notifications" });
  }

  try {
    const notifications = await notificationService.getNotifications(adminId);

    return res.status(200).json({ notifications });
  } catch (error) {
    if (error instanceof CustomError) {
      return res.status(error.statusCode).json({ message: error.message });
    }
    return res
      .status(500)
      .json({ message: errorMessages.INTERNAL_SERVER_ERROR });
  }
};

module.exports = {
  getNotifications,
  rejectNotifications,
  approveNotifications,
};
