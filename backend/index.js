require('dotenv').config()
const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')
const port = process.env.PORT

const app = express()

app.use(cors())
app.use(express.json())

mongoose.connect(process.env.MONGO_URI)
    .then(() => console.log("DB Connected"))

app.use('/api/auth', require('./routes/authRoutes'))    

app.get('/', (req,res) => {
    res.send('Welcome to homepage')
})

app.listen(port, () => {
    console.log(`Server is running on Port No. ${process.env.PORT}`);
    
})