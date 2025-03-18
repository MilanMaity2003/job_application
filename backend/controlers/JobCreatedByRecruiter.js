const User = require('../models/User');
const Job = require('../models/Job');


exports.getRecruiterJob = async(req, res) =>{
    try{
        const id = req.user.id;

        const postedJob = await Job.find({createdBy: id});
        if(postedJob){
            return res.status(200).json({
                success: true,
                massage: "Job is fetching successfully",
                postedJob,
            });
        }
        else{
            return res.status(200).json({
                massage: "No Job is created",
            })
        }
    }
    catch(error){
        res.status(400).json({
            massage: "Error in fetching Job",
        })
        console.log(error);
    }
}