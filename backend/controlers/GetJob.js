const User = require('../models/User');
const Job = require('../models/Job');

exports.getJob = async(req, res) =>{
    try{

        const {id} = req.params;
        const job = await Job.findById(id);
        if(!job){
            return res.status(401).json({
                massage: "Job not found",
            })
        }

        res.status(200).json({
            success: true,
            job,
            massage: "Job is fetched successfully",
        });
    }
    catch(error){
        res.status(400).json({
            massage: "Error in getting job",
        })
    }    
}