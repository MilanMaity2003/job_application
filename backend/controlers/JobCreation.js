    const User = require('../models/User');
    const Job = require('../models/Job');

    exports.createJob = async(req, res) =>{
       try{
            const{jobTitle, location, jobType, companyName, jobDescription, jobNiche, qualifications, salary,jobDetails,requiredSkills,responsibilities  } = req.body;

            // if(!jobTitle || !location || !jobType || !companyName || !jobDescription || !jobNiche || !qualifications || !sallary){
            //     return res.status(400).json({
            //         massage: "All fillds are required",
            //     })
            // }
            const createdBy = req.user.id;
            
            const job = await Job.create({
                jobTitle,
                location,
                jobType,
                companyName,
                jobDescription,
                jobNiche,
                qualifications,
                salary,
                createdBy,
                jobDetails,
                requiredSkills,
                responsibilities

            })
            
            res.status(200).json({
                success: true,
                massage: "Job is created Successfully",
                data: job,
            });

       }
       catch(error){
            // res.status(400).json({
            //     massage: "Error in job creation",
            // })
            console.log(error);
       }

    }