import mongoose from "mongoose"

const ClassSchema = new mongoose.Schema({
  className: { type: String, required: true },
  instructor: { type: String },
})

export const ClassModel = mongoose.model("Class", ClassSchema)
