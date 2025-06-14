const mongoose = require('mongoose');
const dotenv = require('dotenv')

dotenv.config();

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('Connected to MongoDB Atlas');
  } catch (error) {
    console.error('MongoDB connection error:', error);
    process.exit(1); // stop app if DB fails
  }
};

module.exports = connectDB;
