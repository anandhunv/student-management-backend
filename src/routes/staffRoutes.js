import express from "express"
import {
  createStaff,
  getAllStaff,
  editStaff,
  deleteStaff,
  updatePermissions
} from "../controllers/staffController.js"
import { protect, superAdminOnly } from "../middleware/authMiddleware.js"

const router = express.Router()

// All routes protected & Super Admin only
router.use(protect, superAdminOnly)

router.post("/create", createStaff)
router.get("/all", getAllStaff)
router.put("/edit/:id", editStaff)
router.delete("/delete/:id", deleteStaff)
router.patch("/permissions/:id", updatePermissions)

export default router
