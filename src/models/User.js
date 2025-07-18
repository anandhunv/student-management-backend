import mongoose from "mongoose"

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, unique: true, required: true },
  password: { type: String, required: true },
  role: {
    type: String,
    enum: ['superAdmin', 'staff'],
    default: 'staff'
  },
  permissions: {
    students: {
      create: { type: Boolean, default: false },
      view: { type: Boolean, default: false },
      edit: { type: Boolean, default: false },
      delete: { type: Boolean, default: false }
    }
  }
}, { timestamps: true })

export default mongoose.model("User", userSchema)
