import express from "express"
import {addDepartment, addTeacher, adminLogin, checkAdmin, deleteTeacher, editDepartment, editTeacher, getAllDepartments, singleDepartment, singleteacher, viewTeachers} from '../controllers/adminController.js'
import adminAuthenticate from "../middleware/adminAuthentication.js"
import adminAuthorize from "../middleware/adminAuthorization.js"
import upload from "../middleware/upload.js"
import { uploadImage } from "../middleware/uploadImage.js"


const router = express.Router() 

router.post("/login", adminLogin)

router.use(adminAuthenticate)
router.use(adminAuthorize("admin"))

router.get("/dashboard", checkAdmin)
router.post("/addTeacher",uploadImage, addTeacher)
router.post("/addDepartment", addDepartment)
router.get("/viewTeachers", viewTeachers)
router.get("/singleTeacher/:id", singleteacher)
router.put("/editTeacher/:id",uploadImage, editTeacher)
router.delete("/deleteTeacher/:id", deleteTeacher)
router.get("/getAllDepartments", getAllDepartments)
router.get("/singleDepartment/:id",singleDepartment)
router.put("/editDepartment/:id", editDepartment)

export default router