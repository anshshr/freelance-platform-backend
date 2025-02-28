const express=require('express');
const Project = require('../models/project.model');
const Client = require('../models/client.model');
const freelance = require("../models/freelance.model")
const groq=require("groq-sdk");
const groqClient=new groq({
    apiKey:process.env.GROQ_API_KEY
})
async function main(data1,data2) {
    try {
        const chatCompletion = await groqClient.chat.completions.create({
            messages: [{
                role: 'user', content: "Evaluate if the freelancer is a good fit for the project which is posted by the client on our freelancing website. The project description is: " + data2 + " and the freelancer's skills are: " + data1 + ". Respond with only 'yes' or 'no' based on a thorough analysis."}],
            model: "gemma2-9b-it",
        });
    
        const extractData=chatCompletion.choices[0].message.content
        // console.log(extractData.trim())
        return extractData;
        // let startIndex=extractData.indexOf("{");
        // let endIndex=extractData.lastIndexOf("}");
        // let jsonData=extractData.substring(startIndex,endIndex+1);
        // jsonData=jsonData.trim();
        // const jsonObject=await JSON.parse(jsonData);
        // return jsonObject;
    } catch (error) {
        throw new Error(error.message)
    }
}
const router=express.Router();
router.get("/",(req,res)=>{
    res.json({
        message:"This is project Page"
    })
})
router.post("/createProject",async (req,res)=>{
    try {
        const {title,description,client,budget,deadline,skillsRequired,projectImage}=await req.body;
        if(!title || !description || !client || !budget || !deadline || !skillsRequired ){
            return res.json({
                message:"Please fill all the fields"
            })
        }
        // const newClient=await Client.findById(client);
        // if(!newClient){
        //     return res.json({
        //         message:"Client not found"
        //     }) 
        // }
        const newProject=new Project({
            title,
            description,
            client,
            budget,
            deadline,
            skillsRequired,
            projectImage
        })
        await newProject.save();
        // newClient.projectsPosted.push(newProject._id);
        // await newClient.save();
        let chosenFreelancer=[];
        const freelancers=await freelance.find();
        for (const freelancer of freelancers) {
            const freelancerData = JSON.stringify(freelancer);
            const projectData = title + " " + description + " " + skillsRequired.join(" ");

            console.log(1);
            let chatResponse = await main(freelancerData, projectData);
            chatResponse = chatResponse.trim().toLowerCase();

            if (chatResponse === "yes") {
                console.log(chatResponse);
                freelancer.newProjectNotification.push({
                    ProjectId: newProject._id,
                    isRead: false
                });
                await freelancer.save(); 
                chosenFreelancer.push(freelancer);
            }
        }

        // if(freelancers){
        //     freelancers.forEach(async (freelancer)=>{
        //         freelancer.newProjectNotification.push({
        //             ProjectId:newProject._id,
        //             isRead:false 
        //         })
        //         await freelancer.save();
        //     })
        // }
        res.status(200).json({
            sucess:true,
            message:"New Project Created sucessfully",
            newProject,
            chosenFreelancer,
            // newClient,
            freelancers
        })
    } catch (error) {
        res.json({
            message:"Error in creating project "+error.message
        })
    }
})
router.get("/getProjects",async (req,res)=>{
    try {
        const projects=await Project.find();
        res.status(200).json({
            sucess:true,
            projects
        })
    } catch (error) {
        res.json({
            message:"Error in getting projects "+error.message
        })
    }
})
router.get("/getProject/:id",async (req,res)=>{
    try {
        const project=await Project.findById(req.params.id);
        res.status(200).json({
            sucess:true,
            project
        })  
    } catch (error) {
        res.json({
            message:"Error in getting project "+error.message
        })
    }
})
router.get("/getAllClientProject/:id",async (req,res)=>{
    try {
        const client=await Client.findById(req.params.id);
        if(!client){
            return res.json({
                message:"Client not found"
            })
        }
        const project=await Project.find({
            client:req.params.id
        })
        res.status(200).json({
            sucess:true,
            project
        })
    } catch (error) {
        res.json({
            message:"Error in getting project "+error.message
        })
    }
})
router.post("/updateProject/:id",async (req,res)=>{
    try {
        const project=await Project.findById(req.params.id);
        
        if(!project){
            return res.status(400).json({
                message:"Project not found"
            })
        }
        const updateProject=await Project.findByIdAndUpdate(req.params.id,req.body,{
            new:true
        })
        res.status(200).json({
            sucess:true,
            message:"Project updated sucessfully",
            updateProject
        })
    } catch (error) {
        res.status(400).json({
            message:"Error in updating project "+error.message
        })
    }
})
module.exports=router;