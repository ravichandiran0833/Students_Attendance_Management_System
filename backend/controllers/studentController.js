import db from "../database/db.js"

export const studentViewAttendance = async(req, res)=>{
    try {
        const {id} = req.params
        const sql = "select * from attendance where id =?"
        const [result] = await db.promise().query(sql, [id])

        console.log("result :",result);
        

        if(result.length === 0){
            return res.status(200).json({
                success : true,
                message : "Attendance Data is Empty",
                studentAttendanceData : []
            })
        }

        return res.status(200).json({
            success : true,
            studentAttendanceData : result
        })
    } catch (error) {
        console.log("error :",error);
        
        return res.status(500).json({
            success : false,
            message : "Server Error"
        })
    }
}