    const User = require('../models/User');
    const bcrypt = require('bcrypt');
    const jwt  = require('jsonwebtoken');
    require('dotenv').config();
    const cloudinary = require('cloudinary').v2;
    const {uploadImageToCloudinary} = require('../utils/imageUploader');

    function isSupportedType(type, supportedType){
       return supportedType.includes(type);
    }

    exports.updateProfile = async(req, res) =>{
        try{
            const{name, email, phoneNo, skills } = req.body;
        if(req.user.role == "Student" && !skills ){
            return res.status(400).json({
                massage: "Skills is required",
            })
        }
        const newUser = {
            name: name,
            email: email,
            phoneNo: phoneNo,
            skills: skills,
        }

        if(req.files){
            const resume = req.files.resume;
           if(resume){
            const user = await User.findById(req.user.id);
            console.log("user " ,user);
           const  resumeId = user.resume.public_id;
           if(resumeId){
            await cloudinary.uploader.destroy(resumeId);
           }
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
                newUser.resume = {
                    public_id: response.public_id,
                    url: response.secure_url,
                }
            }

           }
            
           }
           const user = await User.findByIdAndUpdate(req.user.id, newUser,{new:true});


          
           res.status(200).json({
            success: true,
            user,
            massage: "User profile updated successfully"
           })
        }
        catch(error){
            res.status(400).json({
                massage: "Error in updating profile"
            })
        }


    }