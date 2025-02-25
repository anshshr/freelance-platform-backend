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
            
        },
        city: {
            type: String,
            
        }
    },
    profilePicture: {
        type: String,
        required: false
    },
    projectsPosted: [
        {
            type:mongoose.Schema.Types.ObjectId,
            ref:"Project"
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
