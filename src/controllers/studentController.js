import Student from "../models/Student.js"

// Create a student
export const createStudent = async (req, res) => {
  try {
    const { name, age, grade, contact } = req.body

    const student = await Student.create({
      name,
      age,
      grade,
      contact,
      createdBy: req.user._id
    })

    res.status(201).json({ message: "Student created", student })
  } catch (error) {
    res.status(500).json({ message: "Create failed", error: error.message })
  }
}

// Get all students
export const getAllStudents = async (req, res) => {
  try {
    const students = await Student.find().sort({ createdAt: -1 })
    res.json(students)
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch students", error: error.message })
  }
}

// Edit a student
export const editStudent = async (req, res) => {
  try {
    const { id } = req.params
    const { name, age, grade, contact } = req.body

    const student = await Student.findById(id)
    if (!student) return res.status(404).json({ message: "Student not found" })

    student.name = name || student.name
    student.age = age || student.age
    student.grade = grade || student.grade
    student.contact = contact || student.contact

    await student.save()
    res.json({ message: "Student updated", student })
  } catch (error) {
    res.status(500).json({ message: "Update failed", error: error.message })
  }
}

// Delete a student
export const deleteStudent = async (req, res) => {
  try {
    const { id } = req.params
    const student = await Student.findById(id)
    if (!student) return res.status(404).json({ message: "Student not found" })

    await student.deleteOne()
    res.json({ message: "Student deleted" })
  } catch (error) {
    res.status(500).json({ message: "Delete failed", error: error.message })
  }
}
