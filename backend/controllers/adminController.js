import db from "../database/db.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import dotenv from "dotenv";
import cloudinary from "../config/cloudinary.js";
dotenv.config();

export const adminLogin = (req, res) => {
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
  const sql = "select * from admins where email= ? and password = ?";
  db.query(sql, [email, password], (err, result) => {
    if (err) {
      console.log("err:", err);

      return res.status(500).json({
        success: false,
        message: "Database Error",
      });
    }
    if (result.length == 0) {
      return res.status(401).json({
        success: false,
        message: "Wrong Email or Password",
      });
    }

    const adminData = result[0];

    const token = jwt.sign(
      {
        id: adminData.id,
        name: adminData.name,
        email: adminData.email,
        role: adminData.role,
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
      message: "Login Successful",
      adminData: {
        id: adminData.id,
        name: adminData.name,
        email: adminData.email,
        role: adminData.role,
      },
    });
  });
};

export const checkAdmin = (req, res) => {
  return res.status(200).json({
    success: true,
    message: "Welcome Admin",
  });
};

export const addTeacher = async (req, res) => {
  const { name, email, password, department } = req.body;

  if (!req.file) {
    return res.status(400).json({
      success: false,
      message: "Profile Image is Required",
    });
  }

  if (req.file.size > 2 * 1024 * 1024) {
    return res.status(400).json({
      success: false,
      message: "File size must be less than 2 MB",
    });
  }

  const checkSql = "SELECT id FROM teachers WHERE email = ?";

  db.query(checkSql, [email], async (err, existingUser) => {
    if (err) {
      console.log("Check Error:", err);

      return res.status(500).json({
        success: false,
        message: "Database Error",
      });
    }

    if (existingUser.length > 0) {
      return res.status(400).json({
        success: false,
        message: "Email already exists",
      });
    }

    try {
      const uploadResult = await cloudinary.uploader.upload(req.file.path, {
        folder: "teacher",
      });

      const profile_url = uploadResult.secure_url;
      const profile_public_id = uploadResult.public_id;

      const hashedPassword = await bcrypt.hash(password, 10);

      const sql =
        "INSERT INTO teachers(name, email, password, department, profile) VALUES (?, ?, ?, ?, ?)";

      db.query(
        sql,
        [name, email, hashedPassword, department, profile_url],
        async (err, result) => {
          if (err) {
            console.log("DB Error:", err);

            await cloudinary.uploader.destroy(profile_public_id);

            return res.status(500).json({
              success: false,
              message: "Database Error",
            });
          }

          return res.status(201).json({
            success: true,
            message: "Teacher Added Successfully",
          });
        },
      );
    } catch (error) {
      console.log("Cloudinary Error:", error);

      return res.status(500).json({
        success: false,
        message: "Failed to Add Teacher",
      });
    }
  });
};
