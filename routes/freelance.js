const express = require("express");
const freelance = require("../models/freelance.model")
const router = express.Router()

router.get("/getfreelancer", async (req, res) => {
   try {
    const freelancers = await freelance.find()

    res.status(200).json({
        freelancers
    })
   } catch (error) {
    res.status(400).json({ message: "Error getting freelancer", error: err.message })
   }
})

router.post("/createfreelancer", async (req, res) => {
    try {
        const { firstName, lastname, title, bio, skills, hourlyRate, availability, portfolio, education, experience, languages, location, profilePicture, rating, totalReviews, peopleReviewed } = req.body;

    const newFreelancer = new freelance({
        firstName, lastname, title, bio, skills, hourlyRate, availability, portfolio, education, experience, languages, location, profilePicture, rating, totalReviews, peopleReviewed
    })

    await newFreelancer.save();
    res.status(200).json({ "mesagse": "Freelancer created succesfully", "Freelancer Data": newFreelancer });

    } catch (err) {
        res.status(400).json({ message: "Error creating freelancer", error: err.message })
    }
})

module.exports = router
