const mongoose = require("mongoose");
const { Schema, model } = require("mongoose");

const RatingSchema = new Schema ({
    user : {
      type: String,
      ref: 'User',
      required: true
    },
    date: {
        type: String,
        required: true
    },
    ratings: {
        Breakfast: { type: Number, default: 0 }, // store rating value (1–5)
        Lunch: { type: Number, default: 0 },
        Snacks: { type: Number, default: 0 },
        Dinner: { type: Number, default: 0 },
    },
    createdAt: { 
        type: Date,
        default: Date.now,
    },
});
const RatingModel = model("Rating", RatingSchema)
  
module.exports = RatingModel