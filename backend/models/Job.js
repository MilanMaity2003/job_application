    const mongoose = require('mongoose');

    const jobSchema = new mongoose.Schema({
        jobTitle:{
            type: String,
            required: true,
        },
        location:{
            type: String,
            required: true,
        },
        jobType:{
            type: String,
            // enum:["FullTime", "PartTime", "Internship", "Freelancer"],
            required: true,
        },
        companyName:{
            type: String,
            required: true,
        },
        jobDescription:{
            type: String,
            required: true,
        },
        jobNiche:{
            type: String,
            required: true,
        },
        jobDetails: {
            type: String,
            required: true,
        },
        requiredSkills:{
            type: String,
            required: true,
        },
        responsibilities:{
            type:String,
            required: true,
        },
        qualifications:{
            type: String,
            required: true,
        },
        salary:{
            type: String,
            required: true,
        },
        createdBy:{
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true,
        },
        appliedStudent:[
            {
                type:mongoose.Schema.Types.ObjectId,
                ref:"User",
                required: true,
            }
        ],
        psotedAt:{
            type: Date,
            default: Date.now(),
        }
    })
    module.exports = mongoose.model("Job", jobSchema);