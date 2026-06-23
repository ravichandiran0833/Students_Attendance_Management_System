import express from "express"
import { allDepartments, teacherLogin } from "../controllers/teacherController.js"
import authenticate from "../middleware/adminAuthentication.js"

const router = express.Router()

router.post("/login", teacherLogin)

router.use(authenticate)

router.get("/allDepartments", allDepartments)

export default router