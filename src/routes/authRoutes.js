import express from "express"
import {
  signup,
  login,
  logout,
  refresh,
  getProfile
} from "../controllers/authController.js"
import { protect } from "../middleware/authMiddleware.js"

const router = express.Router()

router.post("/signup", signup)        // for Super Admin (initial setup only)
router.post("/login", login)
router.post("/logout", logout)
router.get("/refresh", refresh)
router.get("/profile", protect, getProfile)

export default router
