import mongoose from "mongoose"

const ChatSchema = new mongoose.Schema({
    groupId: { type: mongoose.Schema.Types.ObjectId, ref: 'StudyGroup', required: true },
    senderId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    senderName: { type: String, required: true },
    message: { type: String, maxLength: 500, required: true },
    timestamp: { type: Date, default: Date.now, index: true },
    readBy: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User'}]
})

export const ChatModel = mongoose.model("Chat", ChatSchema)