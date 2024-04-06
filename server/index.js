const express = require('express')
const {dbConnect} = require('./config/database')
const cors = require('cors')
const AuthRoute = require('./routes/AuthRoute')
const SalesRoute = require('./routes/SalesRoute')
const app = express()
require('dotenv').config()

const PORT = process.env.PORT || 4000

app.use(express.json())
app.use(cors())

app.listen(PORT,()=>{
    console.log('Server is Started at Port', PORT)
})

//connect to database
dbConnect()

app.use('/api/v1/auth',AuthRoute)
app.use('/api/v1/sales',SalesRoute)
app.get('/',(req,res)=>{
    res.send('<h1>Backend is Started</h1>')
})