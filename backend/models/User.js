    const mongoose = require('mongoose');
    const validator = require('validator');

    const userSchema = new mongoose.Schema({
        name:{
            type: String,
            required: true,
            trim: true,
        },
        email:{
            type: String,
            required: true,
            valdate: [validator.isEmail, "Please enter in correct format"],
        },
        password:{
            type: String,
            required: true,
            // minLength: [8, "Password must contain at least 8 character"],
            // maxLength: [16, "Password must contain at most 16 character"],
        },
        phoneNo: {
            type: Number,
        required: true,
        },
        role:{
            type: String,
            enum: ["Student", "Recruiter","Admin"],
        },
        resume:{
           public_id: String,
           url: String,
        },
        coverLeter:{
            type: String,
        },
        skills:{
            type: String,
        },
        createdAt:{
            type: Date,
            default: Date.now(),
        }, 
        image: {
            type: String,
        },
    });


    module.exports = mongoose.model("User", userSchema);