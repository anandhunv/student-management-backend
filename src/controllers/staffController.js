import User from "../models/User.js"
import bcrypt from "bcryptjs"

// Create new staff
export const createStaff = async (req, res) => {
  try {
    const { name, email, password, permissions } = req.body

    const exists = await User.findOne({ email })
    if (exists) return res.status(400).json({ message: "Staff already exists" })

    const hashedPassword = await bcrypt.hash(password, 10)

    const staff = await User.create({
      name,
      email,
      password: hashedPassword,
      role: "staff",
      permissions: permissions || {
        students: {
          create: false,
          view: true,
          edit: false,
          delete: false
        }
      }
    })

    res.status(201).json({ message: "Staff created", staff })
  } catch (error) {
    res.status(500).json({ message: "Failed to create staff", error: error.message })
  }
}

// Get all staff
export const getAllStaff = async (req, res) => {
  try {
    const staffList = await User.find({ role: "staff" }).select("-password")
    res.json(staffList)
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch staff", error: error.message })
  }
}

// Edit staff details
// Edit staff details
export const editStaff = async (req, res) => {
  try {
    const staff = await User.findById(req.params.id);
    if (!staff || staff.role !== "staff")
      return res.status(404).json({ message: "Staff not found" });

    const { name, email } = req.body;

    // ⚠️ Check if another user already has this email
    if (email && email !== staff.email) {
      const emailExists = await User.findOne({ email });
      if (emailExists)
        return res.status(400).json({ message: "Email is already in use" });
    }

    if (name) staff.name = name;
    if (email) staff.email = email;

    await staff.save();
    res.json({ message: "Staff updated", staff });
  } catch (error) {
    res.status(500).json({ message: "Update failed", error: error.message });
  }
};

// Delete staff
export const deleteStaff = async (req, res) => {
  try {
    const staff = await User.findById(req.params.id)
    if (!staff || staff.role !== "staff") return res.status(404).json({ message: "Staff not found" })

    await staff.deleteOne()
    res.json({ message: "Staff deleted" })
  } catch (error) {
    res.status(500).json({ message: "Delete failed", error: error.message })
  }
}
 
// Assign/update permissions
export const updatePermissions = async (req, res) => {
  try {
    const { id } = req.params
    const { permissions } = req.body

    const staff = await User.findById(id)
    if (!staff || staff.role !== "staff") return res.status(404).json({ message: "Staff not found" })

    staff.permissions.students = permissions.students
    await staff.save()

    res.json({ message: "Permissions updated", staff })
  } catch (error) {
    res.status(500).json({ message: "Permission update failed", error: error.message })
  }
}
