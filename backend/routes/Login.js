const express = require('express')
const router = express.Router()
const User = require('../models/User.js')

router.post('/login', async (req, res) => {
    try {
        const {email, password} = req.body;
        //checking credentials
        const existingUser = await User.findOne({email});
        if(existingUser) {
            if(existingUser.password !== password) {
                res.json({
                    success:false,
                    message:"Incorrect password"
                })
            } else {
                res.json({
                    success: true,
                    message: "Login successful"
                })
            }
        } else {
            res.json({
                success:false,
                message:"User not found"
            })
        }
    } catch(err) {
        res.json({
            success:false,
            message:"login failed"
        })
    }
})


module.exports = router