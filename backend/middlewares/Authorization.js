const jwt = require('jsonwebtoken');
require('dotenv').config();


// exports.auth = async(req, res, next) =>{
//     try{
//         // console.log("cookies " + req.cookies.token);
//         // console.log("header "+ req.header("Authorization") )
//         const token = req.body.token || req.cookies.token|| req.header("Authorization").replace("bearer ", "") ;
//         if(!token || token === undefined){
//             return res.status(401).json({
//                 massage: "Token is missing"
//             })
//         }
//         try{
//             const decode =  jwt.verify(token, process.env.JWT_SECREAT);
//             console.log( "decode "+  decode);
//             req.user = decode;
//             console.log(req.user);
//         }
//         catch(error){
//             return res.status(401).json({
//                 massage: "Token is invalid",
//             })
//         }
//         next();
//     }
//     catch(error){
//         return res.status(401).json({
//             massage:"Something went wrong while validing token",
//         })
//     }
// }


exports.auth = async (req, res, next) => {
    try {
        const token = req.header("Authorization")?.replace("Bearer ", "") || req.cookies.token; // Extract token from header
        if (!token) {
            return res.status(401).json({ message: "Token is missing" });
            
        }

        try {
            const decoded = jwt.verify(token, process.env.JWT_SECREAT); // Verify token
            req.user = decoded;
            console.log(decoded)
            next();
        } catch (error) {
            return res.status(401).json({ message: "Token is invalid" });
            console.log(error);
        }
    } catch (error) {
        return res.status(401).json({ message: "Error validating token" });
    }
};

exports.isStudent = async(req, res, next)=>{
    try{
        if(req.user.role != "Student"){
            return res.status(401).json({
                massage:"This is a protected route for student",
            })
        }
        next();
    }
    catch(error){
        return res.status(401).json({
            massage:" role is not matched",
        })
    }
}

exports.isRecruiter = async(req, res, next)=>{
    try{
        if(req.user.role != "Recruiter"){
            return res.status(401).json({
                massage:"This is a protected route for student",
            })
        }
        next();
    }
    catch(error){
        return res.status(401).json({
            massage:" role is not matched",
        })
    }
}

exports.isAdmin = async(req, res, next) =>{
    try{
        if(req.user.role != "Admin"){
            return res.status(401).json({
                massage:"This is a protected route for Admin"
            })
        }
        next();
    }
    catch(error){
        return res.status(401).json({
            massage:" role is not matched"
        })
    }
}