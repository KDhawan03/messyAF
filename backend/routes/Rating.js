const express = require('express');
const router = express.Router();
const Rating = require('../models/Rating');

router.get('/ratings/:user/:date', async (req, res) => {
    try {
        const {user, date} = req.params;
        const rating = await Rating.findOne({user, date});
        if(rating) {
            res.json(rating.ratings);
        } else {
            res.json({
                Breakfast: 0,
                Lunch: 0,
                Snacks: 0,
                Dinner: 0
            });
        } 
    } catch (error) {
        console.error(error);
        res.status(500).json({error: error.message});
    }
});

// POST /api/rate - Save or update today's rating
router.post('/rate', async (req, res) => {
    const { user, date, ratings } = req.body;

    const today = new Date().toISOString().split('T')[0];
    const reqDate = new Date(date).toISOString().split('T')[0];

    if (reqDate !== today) {
        return res.status(403).json({ 
            success: false, 
            message: "Only today's ratings can be updated." 
        });
    }

    try {
        const existing = await Rating.findOne({ user, date: reqDate });

        if (existing) {
            existing.ratings = { ...existing.ratings, ...ratings };
            await existing.save();
        } else {
            const newRating = new Rating({ user, date: today, ratings: ratings });
            await newRating.save();
        }
        res.json({ success: true, message: "Rating saved" });
    } catch (err) {
        console.error(err);
        res.status(500).json({ success: false, message: "Server error" });
    }
});
module.exports = router;