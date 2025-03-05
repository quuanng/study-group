import { Router } from "express"
import { StudyGroupModel } from "../models/StudyGroup.js"
import { ClassModel } from "../models/Class.js"
import authMiddleware from "../middleware/authMiddleware.js"

const router = Router()

// gets all chats from a StudyGroup - this route needs to be authenticated so only logged in users of the StudyGroup get access
router.get("/:groupId", async (req, res) => {
    try {
        const messages = await ChatModel.find({ groupId: req.params.groupId }).sort({ timestamp: 1 })
        res.json(messages)
    } catch (error) {
        res.status(500).json({ error: error.message })
    }
})

// sends a chat to a StudyGroup - this route also needs to be authenticated similarly
router.post("/", async(req, res) => {
    try {
        const { groupId, senderId, senderName, message } = req.body

        if (!message || message.trim() === ""){
            return res.status(400).json({ error: "Message can not be empty" })
        }

        const chat = new ChatModel({ groupId, senderId, senderName, message })
        await chat.save()

        res.status(201).json(chat)
    } catch {
        res.status(500).json({ error: error.message })
    }
})


export default router