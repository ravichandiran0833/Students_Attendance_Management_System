import express from "express"
import { studentLogin, studentViewAttendance } from "../controllers/studentController.js"

const router = express.Router()

router.post("/studentLogin", studentLogin)
router.get("/studentViewAttendance/:id", studentViewAttendance)

export default router