const mongoose = require("mongoose");
const projectSchema = new mongoose.Schema({
    client:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Client",
        required:true
    },
  projectImage: [String],
  title: {
    type: String,
    required: true,
    unique:true,
  },
  description: {
    type: String,
    required: true,
    
  },
  budget: {
    type: Number,
    required: true,
    default: 0,
  },
  skillsRequired: {
    type:[String],
    required:true,
  },
  status: { type: String, enum: ["Pending", "Completed", "Inprogress"],default:"Pending" },
  proposalsReceived: { type: Number },
  deadline: { type: Date,required:true },
  datePosted: { type: Date, default: Date.now() },
},{
    timestamps:true
});
const Project=mongoose.model('Project',projectSchema);
module.exports=Project; 