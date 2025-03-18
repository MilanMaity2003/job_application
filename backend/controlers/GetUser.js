    const User = require('../models/User');

    exports.getUser = async(req, res) =>{
        try{
            const id = req.user.id;

            const user = await User.findById(id);
            res.status(200).json({
                success: true,
                user,
                massage: "user is find successfully",
            });
        }
        catch(error){
            res.status(400).json({
                massage: "Error in getting user",
            });
            console.log(error);
        }
    }