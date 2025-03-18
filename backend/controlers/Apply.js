    const Job = require('../models/Job');
    const Application = require('../models/Application');

    const {uploadImageToCloudinary} = require('../utils/imageUploader');
    function isSupportedType(type, supportedType){
       return supportedType.includes(type);
    }
    exports.postApplication = async(req, res) =>{
        try{
            const {id} = req.params;
        const {name, email, phoneNo, gender} = req.body;
        if(!name || !email || !phoneNo || !gender) {
            return res.status(401).json({
                massage: "All fillds are required",
            })
        }
        const studentInfo = {
            studentId: req.user.id,
            name,
            email,
            phoneNo,
            gender,
        };
        const job = await Job.findById(id);
        if(!job){
            return res.status(400).json({
                massage: "Job not found",
            })
        }
        const isApplied = await Application.findOne({
            "studentInfo.studentId" : req.user.id,
            "jobInfo.jobId": id,
        });
        if(isApplied){
            return res.status(400).json({
                massaage: "You have already applied on this job",
            })
        }

        if(req.files && req.files.resume){
            const resume = req.files.resume;

            console.log("Image file", resume);
            const supportedType = ["jpg", "jpeg", "png","pdf"];
            const type = resume.name.split('.')[1].toLowerCase();
            console.log("type", type);


            if(!isSupportedType(type, supportedType)){
                return res.status(400).json({
                    massage:"The type is not supported"
                });
            }


            console.log("Uploading image on cloudinary");
            const response = await uploadImageToCloudinary(resume,'studentResume');
            console.log("cloudinary image", response);
            if(response){
                studentInfo.resume = {
                    public_id: response.public_id,
                    url: response.secure_url,
                }
            }
        }

        const recruiterInfo = {
            recruiterId: job.createdBy,
        }

        const jobInfo = {
            jobId: id,
            jobTitle: job.jobTitle,
            companyName: job.companyName,
        }

        const application = await Application.create({
            studentInfo,
            recruiterInfo,
            jobInfo,
        });
        res.status(200).json({
            success: true,
            massage: "Application is submitted",
            application,
        })
        }
        catch(error){
            res.status(401).json({
                massage: "Error in applying job",
            })
            console.log(error);
        }

    }