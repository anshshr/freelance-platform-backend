const express = require("express")
const router = express.Router();
const clientModel = require("../models/client.model")

router.get("/getclients",  async (req, res) => {
    try {
        const Clients = await clientModel.find();
        res.status(200).json({Clients})
       
    } catch (err) {
        res.status(400).json({"message" : "Error fetching the clients" , error : err.message})
    }
})
router.post("/createClient", async (req, res) => {
    try {
        const {firstName, lastName , companyName , bio ,location , profilePicture , projectsPosted , rating , totalReviews} = req.body;
        
        const newClient =  new clientModel({firstName, lastName , companyName , bio ,location , profilePicture , projectsPosted , rating , totalReviews})

    

    await newClient.save();
    res.status(200).json({ "mesagse": "Client created succesfully", "Client Data": newClient });

    } catch (err) {
        res.status(400).json({ message: "Error creating client", error: err.message })
    }

})

module.exports = router