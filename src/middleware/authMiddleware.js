import jwt from "jsonwebtoken"
import User from "../models/User.js"

export const protect = async (req, res, next) => {
  try {
    const token = req.cookies.accessToken
    if (!token) return res.status(401).json({ message: "Unauthorized - No access token" })

    const decoded = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET)
    const user = await User.findById(decoded.userId).select("-password")
    if (!user) return res.status(401).json({ message: "User not found" })

    req.user = user
    next()
  } catch (error) {
    if (error.name === "TokenExpiredError") {
      return res.status(401).json({ message: "Access token expired" })
    }
    res.status(401).json({ message: "Invalid token", error: error.message })
  }
}

export const superAdminOnly = (req, res, next) => {
  if (req.user?.role === "superAdmin") return next()
  return res.status(403).json({ message: "Access denied: Super Admins only" })
}


