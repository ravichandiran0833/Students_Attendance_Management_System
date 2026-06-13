import express from "express"
import cors from "cors"
import db from "./database/db.js"

import adminRoute from "./routes/adminRoute.js"
import cookieParser from "cookie-parser"
import dotenv from "dotenv"





const app = express()

dotenv.config()
console.log("FRONTEND_URL:", process.env.FRONTEND_URL);

app.use(express.json())
app.use(cors({
    methods : ["GET","POST","DELETE"],
    credentials : true,
    origin  : process.env.FRONTEND_URL
}))

app.use(cookieParser())

app.use("/api/auth/admin", adminRoute)

app.listen(3000, ()=>{
    console.log("server is running");
    
})