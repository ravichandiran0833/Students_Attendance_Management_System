const sql = require("mysql2")

const db = sql.createConnection({
    host : "localhost",
    user  : "root",
    password : "",
    database : "sams"
})

db.connect((err)=>{
    if(err){
        console.log("Database Connection Error:", err);
        return;
    }
    console.log("Database Connected");
    
})

module.exports = db;