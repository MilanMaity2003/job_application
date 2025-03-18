    const Job = require('../models/Job');
    const Application = require('../models/Application');

    exports.allApplication = async(req, res) =>{
        try{
            const {id} = req.params;
            const applications = await Application.find({
                "jobInfo.jobId": id,
            })
            if(!applications){
                return res.status(400).json({
                    massage: "No applicant found",
                })
            }
            
            res.status(200).json({
                success: true,
                applications,
                massage: "All application is found successfully",
            })
        }
        catch(error){
            res.status(400).json({
                massage: "Error in fetching aplications",
            })
            console.log(error);
        }
    }