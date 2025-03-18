    const mongoose = require('mongoose');

    const applicationSchema = new mongoose.Schema({
        studentInfo:{
            studentId:{
               type: mongoose.Schema.Types.ObjectId,
               ref: "User",
               required: true, 
            },
            name: {
                type: String,
                required: true,
            },
            email:{
                type: String,
                required: true,
            },
            phoneNo:{
                type: Number,
                required: true,
            },
            gender:{
                type: String,
                required: true,
            },
            resume:{
                public_id: String,
                url: String,
            }
        },
        recruiterInfo:{
            recruiterId:{
                type: mongoose.Schema.Types.ObjectId,
                ref: "User",
                required: true,
            }
        },
        jobInfo:{
            jobId:{
                type: mongoose.Schema.Types.ObjectId,
                ref:"Job",
                required: true,
            },
            jobTitle:{
                type: String,
                required: true,
            }, 
            companyName:{
                type: String,
                required: true,
            }

        }
    })

    module.exports = mongoose.model("Application", applicationSchema);