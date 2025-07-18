import rateLimit from "express-rate-limit"

// Limit login attempts: 5 per 15 minutes per IP
export const loginLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 5, // limit each IP to 5 login requests per windowMs
  message: { message: "Too many login attempts. Please try again later." },
  standardHeaders: true,
  legacyHeaders: false,
})


// Limit refresh attempts: 10 per 15 minutes per IP
export const refreshLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 10,
  message: { message: "Too many token refresh attempts. Please slow down." },
  standardHeaders: true,
  legacyHeaders: false,
})
