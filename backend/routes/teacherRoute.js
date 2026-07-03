import express from "express"
import { addStudent, allDepartments, deleteStudent, departmentStudents, editAttendance, editStudent, getSingleStudent, submitAttendance, submitEditAttendance, teacherLogin, viewStudents } from "../controllers/teacherController.js"
import authenticate from "../middleware/adminAuthentication.js"
import { uploadImage } from "../middleware/uploadImage.js"

const router = express.Router()

router.post("/login", teacherLogin)

router.use(authenticate)

router.get("/allDepartments", allDepartments)
router.post("/departmentStudents", departmentStudents)
router.post("/submitAttendance", submitAttendance)
router.post("/viewStudents",viewStudents)
router.post("/editAttendance", editAttendance)
router.patch("/submitEditAttendance", submitEditAttendance)

router.post("/addStudent",uploadImage, addStudent)
router.get("/getSingleStudent/:registerNo", getSingleStudent)
router.patch("/editStudent/:id",uploadImage, editStudent)
router.delete("/deleteStudent/:id", deleteStudent)

export default router