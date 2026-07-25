import sql from "mysql2"
import dotenv from "dotenv"

dotenv.config()

// const db = sql.createConnection({
//     host : "localhost",
//     user  : "root",
//     password : "root@123",
//     database : "sams"
// })


const db = sql.createPool({
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
});


// db.connect((err)=>{
//     if(err){
//         console.log("Database Connection Error:", err);
//         return;
//     }
//     console.log("Database Connected");
    
// })

db.getConnection((err, connection) => {
  if (err) {
    console.error("Database Connection Error:", err);
    return;
  }

  console.log("Database Connected");
  connection.release();
});

export default db;