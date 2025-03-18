    const express = require('express');
    const router = express.Router();

    const{signUp, logIn, logOut} = require('../controlers/Authentication');
    const{auth, isStudent, isRecruiter, isAdmin} = require('../middlewares/Authorization');

    const{updateProfile} = require('../controlers/UpdateProfile')
    const {User} = require('../models/User')
    const{getUser} = require('../controlers/GetUser');

    router.post('/signUp', signUp);
    router.post('/logIn',logIn);
    router.post('/logOut',auth,logOut);
    router.put('/update/profile',auth, updateProfile);
    
    router.get('/getUser',auth, getUser);

    router.get('/test', auth, (req, res) =>{
        res.json({
            success : true, 
            massage: "Welcome to Test",
        });
    });

    router.get('/student', auth, isStudent, (req, res) =>{
        res.json({
            success : true, 
            massage: "Welcome to a protected route for student",
        });
    });


    router.get('/recruiter', auth, isRecruiter, (req, res) =>{
        res.json({
            success : true, 
            massage: "Welcome to a protected route for Recruiter",
        });
    });

    router.get('/admin', auth, isAdmin, (req, res) =>{
        res.json({
            success: true,
            massage:"Welcome to a protected route for admin"
        });
    });

    router.get('/getEmail', auth, async(req, res) =>{
        try{
            const id = req.user.id;
            const user = await User.findById(id);
            res.status(200).json({
                success: true,
                user: user,
                massage: "Email is fetched successfully"
            })
        }
        catch{
            res.status(400).json({
                massage: "Error in fetching email"
            })
        }
    } )

    module.exports = router;