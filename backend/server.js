import express from "express"
import cors from "cors"
import db from "./database/db.js"

import adminRoute from "./routes/adminRoute.js"


const app = express()

app.use(express.json())
app.use(cors({
    methods : ["GET","POST","DELETE"],
    origin  : " http://localhost:5173"
}))

app.use("/api/auth", adminRoute)

app.listen(3000, ()=>{
    console.log("server is running");
    
})