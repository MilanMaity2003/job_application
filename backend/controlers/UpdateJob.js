    const User = require('../models/User');
    const Job = require('../models/Job');

    exports.updateJob = async(req, res) =>{
       try{

        const{jobTitle, location, jobType, companyName, jobDescription, jobNiche, qualifications, salary,jobDetails,requiredSkills,responsibilities  } = req.body;
        // if(!jobTitle || !location || !jobType || !companyName || !jobDescription || !jobNiche || !qualifications || !salary){
        //         return res.status(400).json({
        //             massage: "All fillds are required",
        //         })
        //     }
            const newjob = {
                jobTitle,
                location,
                jobType,
                companyName,
                jobDescription,
                jobNiche,
                qualifications,
                salary,
                jobDetails,
                requiredSkills,
                responsibilities

            }    
        const {id} = req.params;
        const job = await Job.findByIdAndUpdate(id, newjob, {new: true});

        res.status(200).json({
            success: true,
            job,
            massage: "Job created successfully",
        });

       }
       catch(error){
            res.status(400).json({
                massage: "Error in updating job",
            })
       }
    }