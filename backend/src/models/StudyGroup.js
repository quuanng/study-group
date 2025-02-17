import mongoose from "mongoose"

const StudyGroupSchema = new mongoose.Schema({
  classId: { type: mongoose.Schema.Types.ObjectId, ref: 'Class', required: true },
  section: { type: String, required: true },
  title: { type: String, required: true },
  time: { type: Date, required: true },
  location: { type: String, required: true },
  maxStudents: { type: Number, required: true },
  creatorId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true }, // User who created the group
  members: [
    {
      userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
      joinedAt: { type: Date, default: Date.now }
    }
  ],
  chat: [
    {
      senderId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
      message: { type: String, required: true },
      timestamp: { type: Date, default: Date.now }
    }
  ]
})

export const StudyGroupModel = mongoose.model("StudyGroup", StudyGroupSchema)
