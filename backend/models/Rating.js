const {Schema, model} = require("mongoose");

const RatingSchema = new Schema ({
    user : {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true
    },
    date: {
        type: String,
        required: true
    },
    ratings: {
        breakfast: {
          type: Number,
          min: 1,
          max: 5
        },
        lunch: {
          type: Number,
          min: 1,
          max: 5
        },
        snacks: {
          type: Number,
          min: 1,
          max: 5
        },
        dinner: {
          type: Number,
          min: 1,
          max: 5
        }
    },
    createdAt: { 
        type: Date,
        default: Date.now,
    },
});