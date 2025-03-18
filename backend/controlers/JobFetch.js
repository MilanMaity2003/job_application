    const User = require('../models/User');
    const Job = require('../models/Job');

    exports.getAllJob = async(req, res) =>{
        try{
            const {locations, niches} = req.query;
            let query = {};
            // query.location = "Bangaluru";
            // query.jobNiche = "FullStack"

        if (locations) {
            const locationArray = locations.split(',');
            query.location = { $in: locationArray };
        }
        if(niches){
           const nicheArray = niches.split(',');
           query.jobNiche = {$in: nicheArray}; 
        }

        const jobs = await Job.find(query);
            res.status(200).json({
                massage: "Job Fetching Successfully", 
                success: true,
                jobs,
            })
        }
        catch(error){
            res.status(400).json({
                massage:"Error in fetching data",
            })
        }
    }