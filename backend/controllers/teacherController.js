import db from "../database/db.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();
export const teacherLogin = (req, res) => {
  // console.log("req.body :", req.body);
  try {
    const { email, password, role } = req.body;
    if (!email) {
      return res.status(400).json({
        success: false,
        message: "Email is Required",
      });
    }
    if (!password) {
      return res.status(400).json({
        success: false,
        message: "Password is Required",
      });
    }
    if (password.length < 8) {
      return res.status(400).json({
        success: false,
        message: "Password Length Must Be 8 Digit",
      });
    }
    const sql = "select * from teachers where email = ? ";
    db.query(sql, [email], async (err, result) => {
      if (err) {
        console.log("err:", err);

        return res.status(500).json({
          success: false,
          message: "Database Error",
        });
      }
      console.log("result :", result);

      if (result.length === 0) {
        return res.status(401).json({
          success: false,
          message: "Wrong Email",
        });
      }

      const teacherData = result[0];
      const passwordMatch = await bcrypt.compare(
        password,
        teacherData.password,
      );
      // console.log("passwordMatch :", passwordMatch);
      if (!passwordMatch) {
        return res.status(401).json({
          success: false,
          message: "Wrong  Password",
        });
      }

      const token = await jwt.sign(
        {
          id: teacherData.id,
          name: teacherData.name,
          email: teacherData.email,
          depaetment: teacherData.depaetment,
          role: teacherData.role,
        },
        process.env.JWT_SECRET_KEY,
        {
          expiresIn: "1d",
        },
      );

      res.cookie("token", token, {
        httpOnly: true,
        secure: false,
        sameSite: "strict",
        maxAge: 24 * 60 * 60 * 1000,
      });

      return res.status(200).json({
        success: true,
        message: "Login SuccessFully",
        teacherData: {
          id: teacherData.id,
          name: teacherData.name,
          email: teacherData.email,
          depaetment: teacherData.depaetment,
          role: teacherData.role,
        },
      });
    });
  } catch (error) {
    return res.status(400).json({
      success: false,
      message: "Failed to Login",
    });
  }
};

export const allDepartments = async (req, res) => {
  try {
    const sql = "select * from departments";
    const [result] = await db.promise().query(sql);

    if (result.length === 0) {
      return res.status(200).json({
        success: true,
        allDepartmentsData: [],
        message: "No departments found",
      });
    }
    return res.status(200).json({
      success: true,
      allDepartmentsData: result,
    });
  } catch (error) {
    console.log("error:", error);

    return res.status(500).json({
      success: false,
      message: "Database Error",
    });
  }
};

// db.query(sql, (err, result)=>{
//   if(err){
//     console.log("err:",err);

//     return res.status(500).json({
//       success : false,
//       message : "Database Error"
//     })
//   }
//   if(result.length === 0){
//     return res.status(400).json({
//       success : false,
//       message : "Departments is Empty"
//     })
//   }
//   return res.status(200).json({
//     success : true,
//     allDepartmentsData : result
//   })
// })

export const departmentStudents = async (req, res) => {
  // console.log("req.body:",req.body);

  try {
    const { departmentName, graduate, year } = req.body;

    if (!departmentName || !graduate || !year) {
      return res.status(400).json({
        success: false,
        message: "Department Details is Empty",
      });
    }

    const sql =
      "select * from students where department_name = ? and graduate = ? and year = ? order by register_no asc";
    const [result] = await db
      .promise()
      .query(sql, [departmentName, graduate, year]);
    // console.log("result :",result);
    if (result.length === 0) {
      return res.status(200).json({
        success: true,
        message: "Students Data is Empty",
        departmentStudentsData: [],
      });
    }

    return res.status(200).json({
      success: true,
      departmentStudentsData: result,
    });
  } catch (error) {
    console.log("error:", error);
    return res.status(500).json({
      success: false,
      message: "Server Error",
    });
  }
};

export const submitAttendance = async (req, res) => {
  // console.log("req.body :", req.body);
  try {
    const attendanceData = Object.values(req.body);
    let existingCount = 0;
    console.log(attendanceData);
    for (const student of attendanceData) {
      console.log("student:", student);
      const { studentId, registerNo, status, attendanceDate } = student;

      const checkSql =
        "select id from attendance where register_no =? and attendance_date=?";
      const [existingData] = await db
        .promise()
        .query(checkSql, [registerNo, attendanceDate]);

      if (existingData.length > 0) {
        existingCount++;
        continue;
      }

      const insertSql = `insert into attendance
      (
      student_id,
      register_no,
      attendance_date,
      status
      )
      values(?,?,?,?)
      `;
      const [result] = await db
        .promise()
        .query(insertSql, [studentId, registerNo, attendanceDate, status]);

      console.log("result :", result);
    }

    if (existingCount === attendanceData.length) {
      return res.status(400).json({
        success: false,
        message: "Attendance Already Submitted",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Attendance Submitted Successfully",
    });
  } catch (error) {
    console.log("error:", error);
    return res.status(500).json({
      success: false,
      message: "Server Error",
    });
  }
};
