const express = require("express")
const db = require("./database/db")
const app = express()

app.get("/",(req, res)=>{
    res.send("hello from node.js server")
})

app.listen(3000, ()=>{
    console.log("server is running");
    
})