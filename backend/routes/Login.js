const express = require('express')
const router = express.Router()
const User = require('../models/User.js')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')

router.post('/login', async (req, res) => {
    try {
        const {email, password} = req.body;
        //checking credentials
        const existingUser = await User.findOne({email});

        if(!existingUser) {
            return res.status(400).json({
                success:false,
                message:"User not found"
            })
        }

        //use bcrypt
        const isPasswordValid = await bcrypt.compare(password, existingUser.password);

        if(!isPasswordValid) {
            return res.status(400).json({
                success:false,
                message:"Incorrect password"
            })
        }

        //password same generate jwt access token
        const accessToken = jwt.sign(
            {
                userId: existingUser._id.toString(),
                email: existingUser.email,
                name: existingUser.name,
                type: 'access'
            },
            process.env.JWT_ACCESS_SECRET,
            {expiresIn: '15m'}
        );
    
        const refreshToken = jwt.sign(
            {
                userId: existingUser._id.toString(),
                type : 'refresh'
            },
            process.env.JWT_REFRESH_SECRET,
            {expiresIn: '30d'}
        )

        res.json({
            success: true,
            message: "Login successful",
            accessToken: accessToken,
            refreshToken: refreshToken,
            user: {
                id: existingUser._id.toString(),
                name: existingUser.name,
                email: existingUser.email
            }
        })
    } catch(err) {
        console.error('Login error:', err);
        res.status(500).json({
            success:false,
            message:"Login Failed"
        })
    }
})

//refresh token router
router.post('/refresh', async (req, res) => {
    try {
        const {refreshToken} = req.body;
        
        if(!refreshToken) {
            return res.status(401).json({
                success:false,
                message:'Refresh token required'
            });
        }

        //if present then verify
        const decoded = jwt.verify(refreshToken, process.env.JWT_REFRESH_SECRET);

        //needed as refresh only stores userId
        const user = await User.findById(decoded.userId);
        if(!user) {
            return res.status(404).json({
                success:false,
                message:'user not found'
            });
        }

        //generate new accessToken
        const newAccessToken = jwt.sign(
            { 
                userId: user._id.toString(),
                email: user.email,
                name: user.name,
                type: 'access'
            },
            process.env.JWT_ACCESS_SECRET,
            { expiresIn: '15m' }
        );

        res.json({
            success: true,
            accessToken: newAccessToken
        });
    } catch (err) {
        console.error('Refresh token error', err);
        res.status(403).json({
            success:false,
            message:'Invalid or expired refresh token'
        })
    }
})
module.exports = router