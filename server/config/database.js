const mongoose = require('mongoose')
require('dotenv').config()
const DBURL = process.env.DATABASE_URL || 'mongodb+srv://ratanjeetsinghrandhawa79:Ratan09@cluster0.0tbnww4.mongodb.net/salesData'

exports.dbConnect = (req,res)=>{
     mongoose.connect(DBURL).then(()=>{
        console.log('DB Connected Successfully')
     }).catch((err)=>{
        process.exit(1)
        console.log(`Error in Connecting Database ${err}`)
     })
} 