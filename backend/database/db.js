import sql from "mysql2"

const db = sql.createConnection({
    host : "localhost",
    user  : "root",
    password : "root@123",
    database : "sams"
})

db.connect((err)=>{
    if(err){
        console.log("Database Connection Error:", err);
        return;
    }
    console.log("Database Connected");
    
})

export default db;