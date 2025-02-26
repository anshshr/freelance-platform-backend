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
        const { firstName, lastName, title, bio, skills, hourlyRate, availability, portfolio, education, experience, languages, location, profilePicture, rating, totalReviews, peopleReviewed } = req.body;

        const newFreelancer = new freelance({
            firstName, lastName, title, bio, skills, hourlyRate, availability, portfolio, education, experience, languages, location, profilePicture, rating, totalReviews, peopleReviewed
        })

        await newFreelancer.save();
        res.status(200).json({ "mesagse": "Freelancer created succesfully", "Freelancer Data": newFreelancer });

    } catch (err) {
        res.status(400).json({ message: "Error creating freelancer", error: err.message })
    }
})
router.post("/addPortfolioProject", async (req, res) => {
    try {
        const { id, projectName, description, link, images } = req.body;
        const getUser = await freelancer.findById(freelancerId);
        if (!getUser) {
            return res.status(404).json({
                message: "Freelancer not found"
            })
        }
        const newPortfolioProject = {
            projectName,
            description,
            link,
            images
        }
        getUser.portfolio.push(newPortfolioProject);
        await getUser.save();
        res.status(200).json({
            message: "Project Added Sucessfully",
            getUser
        })
    } catch (error) {
        res.status(500).json({
            message: "Cant add project to portfolio" + error.message
        })
    }
})


router.get("/getfreelancer/:id", async (req, res) => {
    try {
        const id = req.params.id

        const user = await freelance.findOne({ _id: id });

        if (user) {

            res.status(200).json({ "message": "Found the user", "user": user })
        }
        else {
            res.status(200).json({ "message": "No such user exist" })
        }

    } catch (error) {
        res.status(500).json({
            message: "Cant add project to portfolio" + error.message
        })
    }
})
module.exports = router
