const { Notification } = require("../models");
const { Op } = require("sequelize");
const sendEmail = require("../utils/sendEmail"); // Import your email utility
const errorMessages = require("../constants/errorMessages");

/**
 * Notify admins about pending follow requests.
 */
const notifyAdminsAboutPendingRequests = async () => {
  try {
    // Fetch pending follow requests with associated admin information
    const pendingFollowRequests = await Notification.findAll({
      where: {
        status: "pending",
      },
    });

    if (!pendingFollowRequests.length) {
      console.log("No pending follow requests found.");
      return;
    }

    // Extract unique admin emails
    const adminEmails = pendingFollowRequests.map((request) => request.email);

    // Iterate over each admin and send email
    for (const email of adminEmails) {
      // Fetch the count of pending requests for each admin
      const adminPendingRequestsCount = await Notification.count({
        where: {
          status: "pending",
          email: email,
        },
      });

      // Build the email content for this admin
      const emailSubject = "Pending Follow Requests Notification";
      const emailBody = `
        <p>Dear Admin,</p>
        <p>You have ${adminPendingRequestsCount} pending follow requests in the system.</p>
        <p>Please review them at your earliest convenience.</p>
        <p>Thank you,</p>
        <p>Your System</p>
      `;

      // Send email to the admin
      await sendEmail({
        to: email,
        subject: emailSubject,
        html: emailBody,
      });

      console.log(
        `Notification email sent to ${email} for ${adminPendingRequestsCount} pending follow requests.`
      );
    }
  } catch (error) {
    console.error(
      "Error notifying admins about pending follow requests:",
      error
    );
    throw new Error(
      errorMessages.INTERNAL_SERVER_ERROR || "Failed to notify admins."
    );
  }
};

module.exports = { notifyAdminsAboutPendingRequests };
