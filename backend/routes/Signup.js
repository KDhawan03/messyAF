const express = require('express')
const router = express.Router()
const User = require("../models/User.js");
const bcrypt = require('bcrypt');

//Post /api/signup
router.post("/signup", async (req, res) => {
    try {
        const {name, email, password} = req.body;
        
        //checking existing user
        const existingUser = await User.findOne({email});
        if(existingUser) {
            return res.json({
                success:false,
                message: "Email already registered"
            })
        }

        const saltRounds = 10;
        const hashedPassword = await bcrypt.hash(password, saltRounds);

        const newUser = new User({
            name,
            email, 
            password: hashedPassword,
        })

        const savedUser = await newUser.save();
        
        res.json({
            success:true,
            message:"User created successfully"
        })

    } catch (error) {
        console.error("Signup error: ", error.message);
        res.json({
            success:false,
        })
    }
});

module.exports = router