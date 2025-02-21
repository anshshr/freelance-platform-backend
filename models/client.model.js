const mongoose = require("mongoose");

const clientSchema = new mongoose.Schema({
    firstName: {
        type: String,
        required: true
    },
    lastName: {
        type: String,
        required: true
    },
    companyName: {
        type: String,
        required: true
    },
    bio: {
        type: String,
        required: true
    },
    location: {
        country: {
            type: String,
            required: true
        },
        city: {
            type: String,
            required: true
        }
    },
    profilePicture: {
        type: String,
        required: false
    },
    projectsPosted: [
        {
            projectImage: [String],
            title: String,
            description: String,
            budget: {
                type: Number,
                default: 0,
            },
            skillsRequired: [String],
            status: { type: String, enum: ["Pending", "Completed", "Inprogress"] },
            proposalsReceived: { type: Number },
            deadline: { type: Date },
            datePosted: { type: Date, default: Date.now },
        }
    ],
    rating: {
        type: Number,
        min: 0,
        max: 5,
        default: 0
    },
    totalReviews: {
        type: Number,
        default: 0
    },

});

const Client = mongoose.model("Client", clientSchema);

module.exports = Client;
