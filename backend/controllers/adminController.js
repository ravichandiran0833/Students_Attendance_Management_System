import db from "../database/db.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import dotenv from "dotenv";
import cloudinary from "../config/cloudinary.js";
import fs from "fs";
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

      if (uploadResult.secure_url) {
        fs.unlinkSync(req.file.path);
        console.log("Image delete from local machine");
      }

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

export const addDepartment = (req, res) => {
  console.log("req body :", req.body);
  const { departmentName, classes } = req.body;

  if (!departmentName) {
    return res.status(400).json({
      success: false,
      message: "Department Name is Required",
    });
  }

  const departNameToLowercae = departmentName.toLowerCase();
  console.log("departNameToLowercaez:", departNameToLowercae);

  const checkDepartment =
    "select id from departments where department_name = ?";
  db.query(checkDepartment, [departNameToLowercae], (err, departmentResult) => {
    if (err) {
      console.log("err :", err);

      return res.status(500).json({
        success: false,
        message: "Database error",
      });
    }
    if (departmentResult.length > 0) {
      return res.status(400).json({
        success: false,
        message: "Department Already Exist",
      });
    }

    try {
      const ug1 = classes.includes("UG-I");
      const ug2 = classes.includes("UG-II");
      const ug3 = classes.includes("UG-III");
      const pg1 = classes.includes("PG-I");
      const pg2 = classes.includes("PG-II");

      const sql =
        "insert into departments(department_name, ug1, ug2, ug3, pg1, pg2) values (?,?,?,?,?,?)";
      db.query(
        sql,
        [departNameToLowercae, ug1, ug2, ug3, pg1, pg2],
        (err, result) => {
          if (err) {
            console.log("err:", err);

            return res.status(500).json({
              success: false,
              message: "Database Error",
            });
          }
          return res.status(201).json({
            success: true,
            message: "Department Added Succesfully",
          });
        },
      );
    } catch (error) {
      console.log("err:", error);

      return res.status(400).json({
        success: false,
        message: "Failed to Add Department",
      });
    }
  });
};

export const viewTeachers = (req, res) => {
  const sql = "select * from teachers";
  db.query(sql, (err, result) => {
    if (err) {
      console.log("err:", err);

      return res.status(500).json({
        success: false,
        message: "Database Error",
      });
    }

    return res.status(200).json({
      success: true,
      teachersData: result,
    });
  });
};

export const singleteacher = (req, res) => {
  // console.log("id:", req.params.id);
  const { id } = req.params;
  const sql = "select * from teachers where id = ?";
  db.query(sql, [id], (err, result) => {
    if (err) {
      console.log("err:", err);

      return res.status(400).json({
        success: false,
        message: "Database Error",
      });
    }

    if (result.length === 0) {
      return res.status(404).json({
        success: false,
        message: "Teacher Not Found",
      });
    }

    return res.status(200).json({
      success: true,
      singleTeacherData: result[0],
    });
  });
};

const getPublicIdFromUrl = (url) => {
  const parts = url.split("/upload/")[1];

  return parts.replace(/^v\d+\//, "").replace(/\.[^/.]+$/, "");
};

export const editTeacher = async (req, res) => {
  console.log("req.body :", req.body);
  console.log("req.file :", req.file);

  try {
    const { id } = req.params;
    const { name, email, department, oldProfile } = req.body;
    let profile = oldProfile;
    let uploadImagePublic_id = null;
    if (req.file) {
      const uploadImage = await cloudinary.uploader.upload(req.file.path, {
        folder: "teacher",
      });
      if (uploadImage.secure_url) {
        fs.unlinkSync(req.file.path);
        console.log("Image delete from local machine");
      }
      profile = uploadImage.secure_url;
      uploadImagePublic_id = uploadImage.public_id;
    }
    const sql = `update teachers
    set name = ?, email = ?, department = ?, profile = ?
    where id = ?
    `;
    db.query(
      sql,
      [name, email, department, profile, id],
      async (err, result) => {
        if (err) {
          console.log("err:", err);
          if (uploadImagePublic_id) {
            // await cloudinary.uploader.destroy(uploadImagePublic_id);
            try {
              await cloudinary.uploader.destroy(uploadImagePublic_id);
              console.log("Successfully image delete from cloud");
            } catch (error) {
              console.log("Cloudinary Delete Error:", error);
            }
          }

          return res.status(500).json({
            success: false,
            message: "Database Error",
          });
        }

        if (result.affectedRows === 0) {
          return res.status(404).json({
            success: false,
            message: "Teacher Not Found",
          });
        }

        if (req.file && oldProfile) {
          try {
            const oldPublicId = getPublicIdFromUrl(oldProfile);

            await cloudinary.uploader.destroy(oldPublicId);

            console.log("Old image deleted:", oldPublicId);
          } catch (deleteError) {
            console.log("Failed to delete old image:", deleteError);
          }
        }

        return res.status(200).json({
          success: true,
          message: "Teacher Updated Successfully",
        });
      },
    );
  } catch (error) {
    console.log("Error:", error);

    return res.status(500).json({
      success: false,
      message: "Failed to Update Teacher",
    });
  }
};

export const deleteTeacher = (req, res) => {
  const { id } = req.params;
  console.log("delete id:", id);

  const getProfile_url = "select profile from teachers where id = ?";
  db.query(getProfile_url, [id], (err, urlResult) => {
    if (err) {
      console.log("err:", err);

      return res.status(500).json({
        success: false,
        message: "Database Error",
      });
    }

    if (urlResult.length === 0) {
      return res.status(404).json({
        success: false,
        message: "Teacher Not Found",
      });
    }

    console.log("url result :", urlResult);
    const profile_url = urlResult[0].profile;
    const Profile_public_id = getPublicIdFromUrl(profile_url);
    console.log("Profile_public_id:", Profile_public_id);

    const sql = "delete from teachers where id = ?";
    db.query(sql, [id], async (err, result) => {
      if (err) {
        console.log("err;", err);

        return res.status(500).json({
          success: false,
          message: "Database Error",
        });
      }

      if (result.affectedRows === 0) {
        return res.status(404).json({
          success: false,
          message: "User Not Found",
        });
      }

      try {
        await cloudinary.uploader.destroy(Profile_public_id);
        console.log("Successfully image delete from cloud");
      } catch (error) {
        console.log("Cloudinary Delete Error:", error);
      }

      return res.status(200).json({
        success: true,
        message: "Deleted Successfully",
      });
    });
  });
};

export const getAllDepartments = (req, res) => {
  const sql = "select * from departments";
  db.query(sql, (err, result) => {
    if (err) {
      console.log("err:", err);
      return res.status(500).json({
        success: false,
        message: "Database Error",
      });
    }

    if (result.length === 0) {
      return res.status(400).json({
        success: false,
        message: "Department Data is Empty",
      });
    }

    return res.status(200).json({
      success: true,
      departmentsData: result,
    });
  });
};

export const singleDepartment = (req, res) => {
  const { id } = req.params;
  const sql = "select * from departments where id = ?";
  db.query(sql, [id], (err, result) => {
    if (err) {
      console.log("err:", err);

      return res.status(500).json({
        success: false,
        message: "Database Error",
      });
    }
    if (result.length === 0) {
      return res.status(404).json({
        success: false,
        message: "Department Not Exist in Database",
      });
    }

    return res.status(200).json({
      success: true,
      singleDepartmentData: result[0],
    });
  });
};

export const editDepartment = (req, res) => {
  try {
    const { id } = req.params;
    console.log("id : ", id);
    console.log("req.body :", req.body);
    const { departmentName, classes } = req.body;

    const ug1 = classes.includes("UG-I");
    const ug2 = classes.includes("UG-II");
    const ug3 = classes.includes("UG-III");
    const pg1 = classes.includes("PG-I");
    const pg2 = classes.includes("PG-II");

  const sql = `update departments
  set department_name = ? ,ug1 = ?, ug2 = ?, ug3 = ?, pg1 = ?, pg2 = ?
  where id = ?    
  `;
  db.query(sql,[departmentName, ug1, ug2, ug3, pg1, pg2, id], (err, result)=>{
    if(err){
      return res.status(500).json({
        success : false,
        message : "Database Error"
      })
    }

    if(result.affectedRows === 0){
      return res.status(404).json({
        success : "false",
        message : "Department NOt Found"
      })
    }

    return res.status(200).json({
      success : true,
      message : "Department Updated Successfully"
    })
  })
  } catch (error) {
    return res.status(400).json(({
      success : false,
      message : "Failed To Update Department"
    }))
  }
};
