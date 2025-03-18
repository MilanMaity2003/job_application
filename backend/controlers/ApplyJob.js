    const Job = require('../models/Job');
    const Application = require('../models/Application');

    exports.appliedJob = async(req, res) =>{
       try{
        const id = req.user.id;
        const appliedJob = await Application.find({
            "studentInfo.studentId": id,
        });
        if(!appliedJob){

            return res.status(400).json({
                massage: "You have not applied on any job",
            })
        }


        res.status(200).json({
            success: true,
            appliedJob,
            massage: "All applied job is fetched succssfully",
        }
    )
       }
       catch(error){
            res.status(400).json({
                massage: "Error in fetching appliedJob",
            })
            console.log(error);
       }

    }