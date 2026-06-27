import express from "express"
import { allDepartments, departmentStudents, submitAttendance, teacherLogin, viewStudents } from "../controllers/teacherController.js"
import authenticate from "../middleware/adminAuthentication.js"

const router = express.Router()

router.post("/login", teacherLogin)

router.use(authenticate)

router.get("/allDepartments", allDepartments)
router.post("/departmentStudents", departmentStudents)
router.post("/submitAttendance", submitAttendance)
router.post("/viewStudents",viewStudents)

export default router