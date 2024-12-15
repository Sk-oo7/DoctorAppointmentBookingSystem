const express = require("express");
const colors=require("colors")
const morgan=require('morgan')
const dotenv=require("dotenv");
 const connectDB=require("./config/db.js")
 const path=require('path')
// const cors=require("cors")

// routes
const userRoute=require('./routes/userRoute.js')
const adminRoute=require('./routes/adminRoute.js')
const doctorRoute=require('./routes/doctorRoutes.js')
const app=express();

// middlewares


dotenv.config()
app.use(express.json()) 
app.use(morgan('dev'))
connectDB() 

// routes
app.use("/api/user",userRoute)
app.use("/api/admin",adminRoute)
app.use("/api/doctor",doctorRoute)
// static files
app.use(express.static(path.join(__dirname,"./client/build")))

app.use("*",function (req,res){
  res.sendFile(path.join(__dirname,"./client/build/index.html"))
})

const PORT=process.env.PORT || 5001;
app.listen(PORT,()=> console.log(`Server running on port ${process.env.PORT}`.bgYellow.white)) 