export const checkStudentPermission = (action) => {
  return (req, res, next) => {
    if (req.user.role === "superAdmin") return next() // Full access

    const allowed = req.user?.permissions?.students?.[action]
    if (!allowed) {
      return res.status(403).json({ message: `Access denied: You cannot ${action} students.` })
    }

    next()
  }
}
