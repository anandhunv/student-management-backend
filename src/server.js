import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import cookieParser from "cookie-parser";

import authRoutes from "./routes/authRoutes.js";
import staffRoutes from "./routes/staffRoutes.js";
import studentRoutes from "./routes/studentRoutes.js";

import { connectDB } from "./utils/db.js";




dotenv.config();

const app = express();
const PORT = process.env.PORT || 35001;


const CLIENT_URL = process.env.CLIENT_URL || "http://localhost:5173"
const allowedOrigins = CLIENT_URL.split(",")

app.use(
  cors({
    origin: function (origin, callback) {
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true)
      } else {
        callback(new Error("Not allowed by CORS"))
      }
    },
    credentials: true, // Must be true to send cookies
  })
)

app.use(express.json());
app.use(cookieParser());

// ========== Routes ==========
app.get("/", (req, res) => res.send("Student Management System API"))

app.use("/api/auth", authRoutes)
app.use("/api/students", studentRoutes)
app.use("/api/staff", staffRoutes)


//  Route Not Found 
app.use((req, res, next) => {
  res.status(404).json({ message: "Route not found" });
});

//  Global Error Handler 
app.use((err, req, res, next) => {
  console.error("Error:", err.stack);
  res.status(err.status || 500).json({
    message: err.message || "Internal Server Error"
  });
});

//  Start Server 
const startServer = async () => {
  try {
    await connectDB();
    console.log("MongoDB connected");
    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  } catch (err) {
    console.error("Failed to connect to DB", err);
    process.exit(1);
  }
};

startServer();
