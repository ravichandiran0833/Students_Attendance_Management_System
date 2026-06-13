import express from "express"
import {addTeacher, adminLogin, checkAdmin} from '../controllers/adminController.js'
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

export default router