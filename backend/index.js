const express = require('express')
const connectDB = require('./config/db.js');
const dotenv = require('dotenv');
const app = express()
const cors = require('cors');

app.use(cors());
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

app.get('/', (req, res) => {
  console.log(req.body);
  res.send('Hello World!')
})

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`)
})