const nodemailer = require("nodemailer");

const sendEmail = async ({ to, subject, html }) => {
  const transporter = nodemailer.createTransport({
    service: "Gmail", // Or any other email service
    auth: {
      user: process.env.EMAIL_USER, // Admin email address
      pass: process.env.EMAIL_PASSWORD, // Admin email password
    },
    tls: {
      rejectUnauthorized: false, // Disable SSL certificate validation
    },
  });

  const mailOptions = {
    from: `"Your App Name" <${process.env.EMAIL_USER}>`,
    to,
    subject,
    html,
  };

  try {
    await transporter.sendMail(mailOptions);
    console.log(`Email sent successfully to ${to}`);
  } catch (error) {
    console.error("Error sending email:", error);
    throw new Error("Failed to send email.");
  }
};

module.exports = sendEmail;
