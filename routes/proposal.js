const express = require('express');
const Proposal = require('../models/proposal.model');
const Project = require('../models/project.model');
// const Freelancer=require('../models/freelancer.model');
const router=express.Router();

router.post("/create",async (req,res)=>{
    try {
        const {project,freelancer,amount,timeRequired}=req.body;
        if(!project || !freelancer || !amount || !timeRequired){
            return res.status(400).json({error:"All fields are required"})
        }
        const proposal=new Proposal({
            project,
            freelancer,
            amount,
            timeRequired
        })
        await proposal.save();
        const curProject=await Project.findById(project);
        if(!curProject){
            return res.status(404).json({error:"Project not found"})
        }
        curProject.proposalsReceived.push(proposal._id);
        await curProject.save();
        res.status(201).json({message:"Proposal Created Successfully",proposal,curProject})
    } catch (error) {
        res.status(400).json({error:"Error Creating Proposals"+error.message})
    }
})
router.get("/project/:id",async (req,res)=>{
    try {
        const {id}=req.params;
        const proposals=await Proposal
        .find({project:id})
        .populate("project")

        if(!proposals){
            return res.status(404).json({error:"No Proposals Found"})
        }
        res.status(200).json({proposals})
    } catch (error) {
        return res.status(400).json({error:"Error Fetching Proposals"+error.message})
    }
})
router.get("/:id",async (req,res)=>{
    try {
        const proposal=await Proposal.findById(req.params.id).populate("project").populate("freelancer");
        if(!proposal){
            return res.status(404).json({error:"Proposal not found"})
        }
        res.status(200).json({proposal})
    } catch (error) {
        res.status(400).json({error:"Error Fetching Proposal"+error.message})
    }
})

module.exports=router;
