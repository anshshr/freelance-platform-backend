const mongoose = require("mongoose");
const Project = require("./project.model");

const freelanceSchema = new mongoose.Schema({
  firstName: { type: String, required: true },
  clerkId: String,
  newProjectNotification: [
    {
      projectId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Project",
      },
      isRead: { type: Boolean, default: false },
    }, 
  ],
  lastName: { type: String, required: true },
  title: { type: String, required: true },
  bio: { type: String, required: true },
  skills: { type: [String], required: true },
  hourlyRate: { type: Number, required: true },
  availability: {
    type: String,
    enum: ["Available", "Busy", "On Vacation","Full-time"],
    default: "Available",
  },

  portfolio: [
    {
      projectName: { type: String, required: true },
      description: { type: String },
      link: { type: String },
      images: [{ type: String }],
    },
  ],

  education: [
    {
      institution: { type: String, required: true },
      degree: { type: String, required: true },
      fieldOfStudy: { type: String, required: true },
      marks: { type: String },
      CGPA: { type: String },
    },
  ],

  experience: [
    {
      company: { type: String, required: true },
      position: { type: String, required: true },
      description: { type: String },
      startDate: { type: Date, required: true },
      endDate: { type: Date },
    },
  ],

  languages: { type: [String], required: true },

  location: {
    country: { type: String, required: true },
    city: { type: String, required: true },
  },

  profilePicture: { type: String },
  rating: { type: Number, default: 0 },
  totalReviews: { type: Number, default: 0 },

  peopleReviewed: [
    {
      userId: { type: String },
      reviewText: { type: String },
      ratingGiven: { type: Number, min: 1, max: 5 },
    },
  ],
});

const Freelancer = mongoose.model("Freelancer", freelanceSchema);
module.exports = Freelancer;
