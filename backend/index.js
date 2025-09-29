const express = require('express')
const connectDB = require('./config/db.js');
const dotenv = require('dotenv');
const app = express()
const cors = require('cors');

app.use(cors({
  origin: ["https://messy-af.vercel.app", "http://localhost:5173", "http://localhost:3000"],  
  methods: ["GET", "POST", "PUT", "DELETE"],
  credentials: true
}));

//load env
dotenv.config();

const PORT = process.env.PORT;

connectDB();

app.use(express.json());

const signup = require("./routes/Signup.js")
app.use('/api', signup);
// api/signup

const login = require("./routes/Login.js")
app.use('/api', login);

const rating = require("./routes/Rating.js");
console.log('Rating route loaded:', rating);
app.use('/api', rating);
console.log('Rating route registered at /api');

app.get('/', (req, res) => {
  console.log(req.body);
  res.send('Hello World!')
})

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`)
})