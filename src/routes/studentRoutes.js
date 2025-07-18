import express from "express"
import {
  createStudent,
  getAllStudents,
  editStudent,
  deleteStudent
} from "../controllers/studentController.js"
import { checkStudentPermission } from "../middleware/checkStudentPermission.js"
import { protect } from "../middleware/authMiddleware.js"

const router = express.Router()

// All student routes require login
router.use(protect)

router.post("/", checkStudentPermission("create"), createStudent)
router.get("/", checkStudentPermission("view"), getAllStudents)
router.put("/:id", checkStudentPermission("edit"), editStudent)
router.delete("/:id", checkStudentPermission("delete"), deleteStudent)

export default router
