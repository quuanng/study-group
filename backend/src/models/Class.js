import mongoose from "mongoose"

const ClassSchema = new mongoose.Schema({
  className: { type: String, required: true },
  instructor: { type: String },
  calendar: [
    {
      date: { type: Date, required: true },
      studyGroups: [{ type: mongoose.Schema.Types.ObjectId, ref: "StudyGroup" }]
    }
  ]
})

export const ClassModel = mongoose.model("Class", ClassSchema)
