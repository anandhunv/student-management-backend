import jwt from "jsonwebtoken"
import User from "../models/User.js"
import bcrypt from "bcryptjs"

// Generate tokens
const generateTokens = (userId) => {
  const accessToken = jwt.sign({ userId }, process.env.ACCESS_TOKEN_SECRET, { expiresIn: "15m" })
  const refreshToken = jwt.sign({ userId }, process.env.REFRESH_TOKEN_SECRET, { expiresIn: "7d" })
  return { accessToken, refreshToken }
}

// Set tokens in cookies
const setCookies = (res, accessToken, refreshToken) => {
  res.cookie("accessToken", accessToken, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "Strict",
		maxAge: 15 * 60 * 1000, // 15 minutes
  })
  res.cookie("refreshToken", refreshToken, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "Strict",
		maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
  })
}

// Signup (Only used once for Super Admin)
export const signup = async (req, res) => {
  const { name, email, password } = req.body
  try {
    const exists = await User.findOne({ email })
    if (exists) return res.status(400).json({ message: "User already exists" })

    const hashed = await bcrypt.hash(password, 10)

    const user = await User.create({
      name,
      email,
      password: hashed,
      role: "superAdmin",
      permissions: {
        students: { create: true, view: true, edit: true, delete: true }
      }
    })

    const { accessToken, refreshToken } = generateTokens(user._id)
    setCookies(res, accessToken, refreshToken)

    res.status(201).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      role: user.role
    })
  } catch (error) {
    res.status(500).json({ message: "Signup failed", error: error.message })
  }
}

// Login
export const login = async (req, res) => {
  const { email, password } = req.body
  try {
    const user = await User.findOne({ email })
    if (!user) return res.status(400).json({ message: "Invalid credentials" })

    const match = await bcrypt.compare(password, user.password)
    if (!match) return res.status(400).json({ message: "Invalid credentials" })

    const { accessToken, refreshToken } = generateTokens(user._id)
    setCookies(res, accessToken, refreshToken)

    res.json({
      _id: user._id,
      name: user.name,
      email: user.email,
      role: user.role
    })
  } catch (error) {
    res.status(500).json({ message: "Login failed", error: error.message })
  }
}

// Logout
export const logout = async (req, res) => {
  res.clearCookie("accessToken")
  res.clearCookie("refreshToken")
  res.json({ message: "Logged out successfully" })
}

// Refresh access token
export const refresh = async (req, res) => {
  const token = req.cookies.refreshToken
  if (!token) return res.status(401).json({ message: "No refresh token found" })

  try {
    const decoded = jwt.verify(token, process.env.REFRESH_TOKEN_SECRET)
    const accessToken = jwt.sign({ userId: decoded.userId }, process.env.ACCESS_TOKEN_SECRET, { expiresIn: "15m" })

    res.cookie("accessToken", accessToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "Strict",
      maxAge: 15 * 60 * 1000,
    })

    res.json({ message: "Access token refreshed" })
  } catch (error) {
    res.status(403).json({ message: "Invalid refresh token", error: error.message })
  }
}

// Get logged in user's profile
export const getProfile = async (req, res) => {
  try {
    res.json(req.user)
  } catch (error) {
    res.status(500).json({ message: "Failed to get profile", error: error.message })
  }
}
