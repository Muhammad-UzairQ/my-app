const { Profile } = require("../models");

const createUserProfile = async (req, res) => {
  try {
    const { jobTitle, companyName, location } = req.body;

    // `req.user.id` contains the userId extracted from the middleware
    const userId = req.user.id;

    if (!jobTitle || !companyName || !location) {
      return res.status(400).send("All fields are required!");
    }
    // Create the profile with userId
    const newProfile = await Profile.create({
      jobTitle,
      companyName,
      location,
      userId,
    });
    return res.status(201).json({
      message: "Profile created successfully!",
      profile: newProfile,
    });
  } catch (error) {
    console.error("Error saving user profile:", error);
    return res.status(500).send("An error occurred while saving the profile.");
  }
};

const getUserProfile = async (req, res) => {
  try {
    const userId = req.user.id; // Extract userId from the middleware

    // Fetch the profile associated with the userId
    const profile = await Profile.findOne({ where: { userId } });

    if (!profile) {
      return res.status(404).send("Profile not found.");
    }

    return res.status(200).json({ ...profile });
  } catch (error) {
    console.error("Error fetching user profile:", error);
    return res
      .status(500)
      .send("An error occurred while fetching the profile.");
  }
};

module.exports = { createUserProfile, getUserProfile };
