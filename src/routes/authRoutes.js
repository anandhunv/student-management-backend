import express from "express"
import {
  signup,
  login,
  logout,
  refresh,
  getProfile
} from "../controllers/authController.js"
import { protect } from "../middleware/authMiddleware.js"
import { loginLimiter, refreshLimiter } from "../middleware/rateLimiters.js"

const router = express.Router()

router.post("/signup", signup)        // for Super Admin (initial setup only)
router.post("/login",loginLimiter, login)
router.post("/logout", logout)
router.get("/refresh",refreshLimiter, refresh)
router.get("/profile", protect, getProfile)

export default router
