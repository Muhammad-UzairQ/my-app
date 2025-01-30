const nodemailer = require("nodemailer");

const sendEmail = async ({ to, subject, html }) => {
  const transporter = nodemailer.createTransport({
    // service: "gmail", // Or any other email service
    secure: false,
    host: process.env.EMAIL_HOST,
    port: process.env.EMAIL_PORT,
    auth: {
      user: process.env.EMAIL_USER, // Admin email address
      pass: process.env.EMAIL_PASSWORD, // Admin email password
    },
    tls: {
      rejectUnauthorized: false, // Disable SSL certificate validation
    },
  });

  const mailOptions = {
    from: "no-reply@example.com",
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
