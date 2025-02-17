import mongoose, { mongo } from "mongoose"

const UserSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    profilePicture: { type: String },
    classes: [
      {
        classId: { type: mongoose.Schema.Types.ObjectId, ref: 'Class' },
        section: { type: String } // User's section within the class
      }
    ],
    subscriptionStatus: {
      isActive: { type: Boolean, default: true },
      startDate: { type: Date, default: Date.now },
      endDate: { type: Date } // For tracking subscription expiry
    },
    settings: {
      notificationsEnabled: { type: Boolean, default: true },
      darkMode: { type: Boolean, default: false }
    }
})

export const UsersModel = mongoose.model("users", UserSchema)
  