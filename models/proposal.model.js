const mongoose = require("mongoose");
const proposalSchema=new mongoose.Schema({
    project:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Project",
    },
    freelancer:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Freelancer"
    },
    amount:{
        type:Number,
        required:true
    },
    timeRequired:{
        type:Number,
        required:true
    },
})

const Proposal=mongoose.model("Proposal",proposalSchema);
module.exports=Proposal;