const Job = require('../models/Job');
const Application = require('../models/Application');

exports.isApplied = async(req, res) =>{
    try{

        const {id} = req.params;
        const job = await Job.findById(id);
        if(!job){
            return res.status(402).json({
                massage: "Job of this id does not exist",
            })
        }

        const isApplied = await Application.findOne({
            "studentInfo.studentId" : req.user.id,
            "jobInfo.jobId": id,
        });
        if(isApplied){
            res.status(200).json({
                success: true,
                applied: true,
                massage: "You have already applied on this job",
            });
        }
        else{
            res.status(200).json({
                applied: false,
                massage: "You have not applied on this job",
            })
        } 
    }
    catch(error){
        res.status(400).json({
            massage: "Error in fetching isApplied",
        })
    }
}