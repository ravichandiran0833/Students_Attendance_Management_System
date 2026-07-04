import express from "express"
import { studentViewAttendance } from "../controllers/studentController.js"

const router = express.Router()

router.get("/studentViewAttendance/:id", studentViewAttendance)

export default router