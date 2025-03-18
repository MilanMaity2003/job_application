    const User = require('../models/User');
    const Job = require('../models/Job');

    exports.deleteJob = async(req, res) =>{
        try{

            const {id} = req.params;
            const job = await Job.findById(id);
            
            if(!job){
                return res.status(400).json({
                    massage: "Job is not found at that id",
                })
            }

            await job.deleteOne();
            res.status(200).json({
                massage: "Job is deleted successfully",
            })
        }
        catch(error){
            res.status(400).json({
                massage: "Error in deleting job",
            })
            console.log(error);
        }
    }