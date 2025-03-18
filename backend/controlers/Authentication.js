    const User = require('../models/User');
    const bcrypt = require('bcrypt');
    const jwt  = require('jsonwebtoken');
    require('dotenv').config();
    const {uploadImageToCloudinary} = require('../utils/imageUploader');

    function isSupportedType(type, supportedType){
       return supportedType.includes(type);
    }
    exports.signUp = async(req, res) =>{
        try{
           const{name, email, password, confirmPassword, role,  phoneNo, skills} = req.body;
        //    if(!name || !email || !password || !role || !phoneNo || !confirmPassword  ){
        //     return res.status(400).json({
        //         massage: "All fills are required"
        //     });
        //    }
        // const{name, email, password, phoneNo} = req.body;

        //    if(role == "Student" && !skills ){
        //         return res.status(400).json({
        //             massage: "Skills is required",
        //         })
        //    }

        //    if(password !== confirmPassword){
        //     return res.status(400).json({
        //         massage: "Password ans confirmPassword do not match",
        //     })
        //    }

           const existUser = await User.findOne({email});
           if(existUser){
           return  res.status(409).json({
                message: "User is already exist",
            });
           }

           const hashPassword = await bcrypt.hash(password, 10);
           const firstLetter = name.charAt(0);

           const newUser = {
            name,
            email,
            password: hashPassword,
            role,
            phoneNo,
            skills,
            image: `https://api.dicebear.com/5.x/initials/svg?seed=${firstLetter}`
            }

           
           if(req.files && req.files.resume){
            const resume = req.files.resume;
           if(role == "Student" && !resume ){
            return res.status(400).json({
                massage: "resume is required",
            })
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
          const user = await User.create(newUser);


          const payload = {
            email: user.email,
            id : user._id,
            role : user.role,
        }

          let token = jwt.sign(payload, process.env.JWT_SECREAT,{expiresIn: "100h",},);
          user.token = token;
          user.password = undefined;
          const option = {
              expires : new Date( Date.now() + 3*24*60*60*1000),
              httpOnly: true,
          } 


          res.cookie("token", token, option).status(200).json({
              success: true,
              token,
              user,
              massage: "SignUp Successfully",
          });
       

        }
        catch(error){
            // res.status(400).json({
            //    massage: error.massage,
            //    error,
            //    massage: "Error massage",
            // });
            console.log(error)
        }
    }

    // LOGIN
    exports.logIn = async(req, res) =>{
        try{
            const {email, password, role} = req.body;
            if(!email || !password || !role){
                return res.status(400).json({
                    massage:"Fill up the from carefully",
                })
            }
            console.log(email);
            const user = await User.findOne({email});
            console.log(user);
            if(!user){
                
                return res.status(401).json({
                    massage: "User does not exist",
                })
                
            }
            if(role != user.role){

                return res.status(402).json({
                    massage: `This user does not exist as ${role}`,
                })
            }

            if(await bcrypt.compare(password, user.password)){
                const payload = {
                    email: user.email,
                    id : user._id,
                    role : user.role,
                }

                let token = jwt.sign(payload, process.env.JWT_SECREAT,{expiresIn: "100h",},);
                user.token = token;
                user.password = undefined;
                const option = {
                    expires : new Date( Date.now() + 3*24*60*60*1000),
                    httpOnly: true,
                } 
                res.cookie("token", token, option).status(200).json({
                    success: true,
                    token,
                    user,
                    massage: "Login Successfully",
                });
            }
            else{
                return res.status(403).json({
                    massage: "Incorrect Password",
                });
                console.log(error);
            }
        }
        catch(error){
            res.status(400).json({
                massage: "Error in Login",
            })
            console.log( "catch", error);
        }
    }

//









        exports.logOut = async(req,res,next) =>{
        try{
            res.status(200)
            .cookie("token", "", {
            expires: new Date(Date.now()),
            httpOnly: true,
            })
            .json({
            success: true,
            message: "Logged out successfully.",
            });
        }
        catch(error){
           res.status(400).json({
            massage:"Error in logOut",
           })
           console.log(error);
        }
      }
