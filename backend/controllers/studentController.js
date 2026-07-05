import db from "../database/db.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

export const studentLogin = async (req, res) => {
  // console.log("student login body :",req.body);
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

    const sql = "select * from students where email =?";
    const [result] = await db.promise().query(sql, [email]);

    if (result.length === 0) {
      return res.status(201).json({
        success: false,
        message: "Wrong Email",
      });
    }
    const studentData = result[0];
    const passwordMatch = await bcrypt.compare(password, studentData.password);
    if (!passwordMatch) {
      return res.status(201).json({
        success: false,
        message: "Wrong Password",
      });
    }

    const token = jwt.sign(
      {
        student_id: studentData.id,
        register_no: studentData.register_no,
        student_name: studentData.student_name,
        email: studentData.email,
      },
      process.env.JWT_SECRET_KEY,
      {
        expiresIn: "1d",
      },
    );

    res.cookie("token",token,{
        httpOnly: true,
        secure: false,
        sameSite: "strict",
        maxAge: 24 * 60 * 60 * 1000,
    })

    return res.status(200).json({
        success :true,
        message : "Login Successfully",
        studentData : {
            student_id : studentData.id,
            student_name : studentData.student_name,
            register_no : studentData.register_no
        }

    })

  } catch (error) {
    console.log("error :", error);
    return res.status(500).json({
      success: false,
      message: "Server Error",
    });
  }
};

export const studentViewAttendance = async (req, res) => {
  try {
    const { id } = req.params;
    const sql = "select * from attendance where student_id =?";
    const [result] = await db.promise().query(sql, [id]);

    // console.log("result :",result);

    if (result.length === 0) {
      return res.status(200).json({
        success: true,
        message: "Attendance Data is Empty",
        studentAttendanceData: [],
      });
    }

    return res.status(200).json({
      success: true,
      studentAttendanceData: result,
    });
  } catch (error) {
    console.log("error :", error);

    return res.status(500).json({
      success: false,
      message: "Server Error",
    });
  }
};
