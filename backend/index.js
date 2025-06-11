const express = require('express')
const connectDB = require('./config/db.js');
const dotenv = require('dotenv');
const app = express()

//load env
dotenv.config();

const PORT = process.env.PORT;

connectDB();

app.use(express.json());

const signup = require("./routes/Signup.js")
app.use('/api', signup);
// api/signup


app.get('/', (req, res) => {
  console.log(req.body);
  res.send('Hello World!')
})

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`)
})