import db from "../database/db.js";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();

export const adminLogin = (req, res) => {
  console.log("req body :", req.body);
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
    console.log("res:", adminData);

    const token = jwt.sign(
      {
        id: adminData.id,
        name: adminData.name,
        email: adminData.email,
        role: adminData.role
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
        role : adminData.role
      },
    });
  });
};
