const notificationService = require("../services/notificationService");

// Approve a notification by admin
const approveNotifications = async (req, res) => {
  const { notificationId } = req.params; // Get notification ID from request params
  const { id: adminId, role } = req.user; // Assuming `req.user.id` is the authenticated admin's ID

  if (role !== "admin") {
    return res
      .status(403)
      .json({ message: "You are not authorized to approve notifications" });
  }

  try {
    // Call service to approve the notification
    const result = await notificationService.approveNotification(
      notificationId,
      adminId
    );

    if (!result) {
      return res.status(404).json({ message: "Notification not found" });
    }

    return res
      .status(200)
      .json({ message: "Notification approved successfully" });
  } catch (error) {
    console.error("Error approving notification:", error);
    return res
      .status(500)
      .json({ message: "Internal server error", error: error.message });
  }
};

const rejectNotifications = async (req, res) => {
  const { notificationId } = req.params; // Get notification ID from request params
  const { id: adminId, role } = req.user; // Assuming `req.user.id` is the authenticated admin's ID

  if (role !== "admin") {
    return res
      .status(403)
      .json({ message: "You are not authorized to reject notifications" });
  }

  try {
    // Call service to reject the notification
    const result = await notificationService.rejectNotification(
      notificationId,
      adminId
    );

    if (!result) {
      return res.status(404).json({ message: "Notification not found" });
    }

    return res
      .status(200)
      .json({ message: "Notification rejected successfully" });
  } catch (error) {
    console.error("Error rejecting notification:", error);
    return res
      .status(500)
      .json({ message: "Internal server error", error: error.message });
  }
};

// Get all notifications for an admin
const getNotifications = async (req, res) => {
  const { id: adminId, role } = req.user; // Get user ID and role from the authenticated user

  // Check if the user is an admin
  if (role !== "admin") {
    return res
      .status(403)
      .json({ message: "You are not authorized to access notifications" });
  }

  try {
    // Call service to get notifications for the admin
    const notifications = await notificationService.getNotifications(adminId);

    return res.status(200).json({ notifications });
  } catch (error) {
    console.error("Error fetching notifications:", error);
    return res
      .status(500)
      .json({ message: "Internal server error", error: error.message });
  }
};

module.exports = {
  getNotifications,
  rejectNotifications,
  approveNotifications,
};
