import db from "../database/db.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import cloudinary from "../config/cloudinary.js";
import fs from "fs";

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
      const { studentId, registerNo, status, attendanceDate, departmentId } =
        student;

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
      status,
      department_id
      )
      values(?,?,?,?,?)
      `;
      const [result] = await db
        .promise()
        .query(insertSql, [
          studentId,
          registerNo,
          attendanceDate,
          status,
          departmentId,
        ]);

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

export const viewStudents = async (req, res) => {
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
        viewStudentsData: [],
      });
    }

    return res.status(200).json({
      success: true,
      viewStudentsData: result,
    });
  } catch (error) {
    console.log("error:", error);
    return res.status(500).json({
      success: false,
      message: "Server Error",
    });
  }
};

export const editAttendance = async (req, res) => {
  // console.log("edit attendance body : ", req.body);
  try {
    const { departmentId, departmentName, graduate, year, attendanceDate } =
      req.body;
    const sql = `SELECT
    a.id,
    a.student_id,
    s.register_no,
    s.student_name,
    a.status,
    DATE_FORMAT(a.attendance_date,'%Y-%m-%d') AS attendance_date
FROM attendance a
JOIN students s
    ON a.student_id = s.id
WHERE a.department_id = ?
AND s.graduate = ?
AND s.year = ?
AND a.attendance_date = ? `;
    const [result] = await db
      .promise()
      .query(sql, [departmentId, graduate, year, attendanceDate]);

    if (result.length === 0) {
      return res.status(200).json({
        success: true,
        message: "Students Data is Empty",
        editAttendanceData: [],
      });
    }

    return res.status(200).json({
      success: true,
      editAttendanceData: result,
    });
  } catch (error) {
    console.log("error:", error);
    return res.status(500).json({
      success: false,
      message: "Server Error",
    });
  }
};

export const submitEditAttendance = async (req, res) => {
  console.log("submitEditAttendance : ", req.body);

  try {
    const editAttendanceData = Object.values(req.body);
    for (const student of editAttendanceData) {
      const { studentId, registerNo, status, attendanceDate } = student;

      const sql = `update  attendance
      set status = ? where student_id = ? and register_no = ? and attendance_date = ?
      `;
      const [result] = await db
        .promise()
        .query(sql, [status, studentId, registerNo, attendanceDate]);

      if (result.affectedRows === 0) {
        return res.status(400).json({
          success: false,
          message: "Failed to Edit Attendance",
        });
      }
    }

    return res.status(200).json({
      success: true,
      message: "Attendance Edited Successfully",
    });
  } catch (error) {
    console.log("error : ", error);
    return res.status(500).json({
      success: false,
      message: "Server Error",
    });
  }
};

export const addStudent = async (req, res) => {
  console.log("add student body : ", req.body);
  console.log("add student file : ", req.file);

  let publicId = null;

  try {
    const {
      registerNo,
      name,
      email,
      password,
      gender,
      phoneNumber,
      departmentId,
      departmentName,
      graduate,
      year,
    } = req.body;

    if (!req.file) {
      return res.status(400).json({
        success: false,
        message: "Profile image is required",
      });
    }

    if (!registerNo || !name || !email || !password || !departmentId) {
      return res.status(400).json({
        success: false,
        message: "All fields are required",
      });
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return res.status(400).json({
        success: false,
        message: "Invalid Email",
      });
    }

    if (password.length < 8) {
      return res.status(400).json({
        success: false,
        message: "Password must be 8 digit",
      });
    }

    const checkSql = "select id from students where register_no = ?";
    const [existingStudentResult] = await db
      .promise()
      .query(checkSql, [registerNo]);

    if (existingStudentResult.length > 0) {
      return res.status(400).json({
        success: false,
        message: "Student Already Exist",
      });
    }
    const uploadResult = await cloudinary.uploader.upload(req.file.path, {
      folder: "student",
    });
    if (uploadResult.secure_url) {
      if (fs.existsSync(req.file.path)) {
        fs.unlinkSync(req.file.path);
        console.log("Image Deleted successfully from Uploads");
      } else {
        console.log("File does not exist");
      }
    }
    const profileUrl = uploadResult.secure_url;
    publicId = uploadResult.public_id;

    const hashedPassword = await bcrypt.hash(password, 10);

    const sql = `insert into students
    (register_no, student_name, gender, email, phone, department_name, department_id, graduate, year, profile_image, password) 
    values (?,?,?,?,?,?,?,?,?,?,?)`;

    const [result] = await db
      .promise()
      .query(sql, [
        registerNo,
        name,
        gender,
        email,
        phoneNumber,
        departmentName,
        departmentId,
        graduate,
        year,
        profileUrl,
        hashedPassword,
      ]);

    if (result.affectedRows > 0) {
      return res.status(201).json({
        success: true,
        message: "Student Added Successfully",
      });
    }
  } catch (error) {
    console.log("error:", error);

    if (publicId) {
      await cloudinary.uploader.destroy(publicId);
    }

    if (req.file?.path && fs.existsSync(req.file.path)) {
      fs.unlinkSync(req.file.path);
    }

    return res.status(500).json({
      success: false,
      message: "Failed to Add Student",
    });
  }
};

export const getSingleStudent = async (req, res) => {
  try {
    const { registerNo } = req.params;
    const sql = "select * from students where register_no = ?";
    const [result] = await db.promise().query(sql, registerNo);

    if (result.length === 0) {
      return res.status(200).json({
        success: true,
        message: `${registerNo} Student Data Not Availabe in Database`,
        singleStudentData: [],
      });
    }

    return res.status(200).json({
      success: true,
      singleStudentData: result[0],
    });
  } catch (error) {
    console.log("error:", error);
    return res.status(500).json({
      success: false,
      message: "Server Error",
    });
  }
};

export const editStudent = async (req, res) => {
  try {
    const { id } = req.params;

    const {
      registerNo,
      name,
      email,
      gender,
      phoneNumber,
      password,
    } = req.body;

   
    const sql =
      "SELECT profile_image, password FROM students WHERE id = ?";

    const [student] = await db.promise().query(sql, [id]);

    if (student.length === 0) {
      return res.status(404).json({
        success: false,
        message: "Student not found",
      });
    }

    let profileData = student[0].profile_image;
    let studentPassword = student[0].password;

  
    if (req.file) {
      const oldProfile = student[0].profile_image;

      const uploadResult =
        await cloudinary.uploader.upload(req.file.path, {
          folder: "student",
        });

      profileData = uploadResult.secure_url;

   
      if (fs.existsSync(req.file.path)) {
        fs.unlinkSync(req.file.path);
      }


      if (oldProfile) {
        try {
          const parts = oldProfile.split("/");
          const file = parts.pop();
          const folder = parts.pop();

          const publicId =
            `${folder}/${file.split(".")[0]}`;

          await cloudinary.uploader.destroy(publicId);

          console.log(
            "Old Cloudinary image deleted"
          );
        } catch (err) {
          console.log(
            "Cloudinary delete error:",
            err
          );
        }
      }
    }

  
    if (password && password.trim() !== "") {
      studentPassword =
        await bcrypt.hash(password, 10);
    }

    const updateSql = `
      UPDATE students
      SET
        register_no = ?,
        student_name = ?,
        gender = ?,
        email = ?,
        phone = ?,
        profile_image = ?,
        password = ?
      WHERE id = ?
    `;

    const [result] =
      await db.promise().query(updateSql, [
        registerNo,
        name,
        gender,
        email,
        phoneNumber,
        profileData,
        studentPassword,
        id,
      ]);

    if(result.affectedRows ===0){
      return res.status(400).json({
        success : false,
        message : "Failed to Update Student"
      })
    }

    return res.status(200).json({
      success: true,
      message: "Student updated successfully",
    });
  } catch (error) {
    console.log("Edit student error:", error);

    if (
      req.file?.path &&
      fs.existsSync(req.file.path)
    ) {
      fs.unlinkSync(req.file.path);
    }

    return res.status(500).json({
      success: false,
      message: "Server Error",
    });
  }
};
