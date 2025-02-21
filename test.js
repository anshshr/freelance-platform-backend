require("dotenv").config();
const mongoose = require("mongoose");

// Import models
const Client = require("./models/client.model");  // Update with correct filename
const Freelancer = require("./models/freelance.model"); // Update with correct filename

// Connect to MongoDB
mongoose.connect("mongodb+srv://anshshr:ansh123@freelancing-platform.esbya.mongodb.net/")
.then(() => console.log("Connected to MongoDB"))
.catch(err => console.log("Error connecting to MongoDB:", err));

// Sample Client Data
const clientData = new Client({
    firstName: "John",
    lastName: "Doe",
    companyName: "Tech Solutions",
    bio: "A leading software company.",
    location: {
        country: "USA",
        city: "New York"
    },
    profilePicture: "https://example.com/profile.jpg",
    projectsPosted: [
        {
            projectImage: ["https://example.com/project1.jpg"],
            title: "Web App Development",
            description: "Need a full-stack web developer.",
            budget: 5000,
            skillsRequired: ["JavaScript", "Node.js", "MongoDB"],
            status: "Pending",
            proposalsReceived: 3,
            deadline: new Date("2024-10-15"),
        }
    ],
    rating: 4.5,
    totalReviews: 10
});

// Sample Freelancer Data
const freelancerData = new Freelancer({
    firstName: "Alice",
    lastName: "Smith",
    title: "Full Stack Developer",
    bio: "Experienced in MERN Stack development.",
    skills: ["JavaScript", "React", "Node.js", "MongoDB"],
    hourlyRate: 40,
    availability: "Available",
    portfolio: [
        {
            projectName: "E-commerce Website",
            description: "Built a multi-vendor e-commerce platform.",
            link: "https://example.com/ecommerce",
            images: ["https://example.com/ecommerce.jpg"]
        }
    ],
    education: [
        {
            institution: "MIT",
            degree: "B.Tech",
            fieldOfStudy: "Computer Science",
            CGPA: "9.1"
        }
    ],
    experience: [
        {
            company: "Google",
            position: "Software Engineer",
            description: "Worked on scalable web apps.",
            startDate: new Date("2022-01-01"),
            endDate: new Date("2024-06-01")
        }
    ],
    languages: ["English", "French"],
    location: {
        country: "USA",
        city: "San Francisco"
    },
    profilePicture: "https://example.com/alice.jpg",
    rating: 4.9,
    totalReviews: 50,
    peopleReviewed: [
        {
            userId: clientData._id,  // Reference to a Client
            reviewText: "Great freelancer!",
            ratingGiven: 5
        }
    ]
});

// Function to Insert Data
const insertData = async () => {
    try {
        await clientData.save();
        console.log("Client data added successfully!");

        await freelancerData.save();
        console.log("Freelancer data added successfully!");

    } catch (err) {
        console.error("Error inserting data:", err);
    }
};

insertData();
