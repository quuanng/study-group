import { Router } from "express"
import { StudyGroupModel } from "../models/StudyGroup.js"
import { ClassModel } from "../models/Class.js"
import authMiddleware from "../middleware/authMiddleware.js"

const router = Router()

// Add a new study group
router.post("/add", authMiddleware, async (req, res) => {
  const { classId, section, title, time, location, maxStudents, creatorId } = req.body

  try {
    // Ensure the class exists
    const classExists = await ClassModel.findById(classId)
    if (!classExists) {
      return res.status(404).json({ error: "Class not found" })
    }

    // Create the study group
    const newStudyGroup = new StudyGroupModel({
      classId,
      section,
      title,
      time,
      location,
      maxStudents,
      creatorId,
      members: [{ userId: creatorId }] // Add creator as the first member
    })

    await newStudyGroup.save()
    res.status(201).json({
      message: "Study group created successfully",
      studyGroup: newStudyGroup
    })
  } catch (error) {
    console.error(error)
    res.status(500).json({ error: "Failed to create study group" })
  }
})

// Add a user to a study group
router.post("/join", authMiddleware, async (req, res) => {
  const { studyGroupId, userId } = req.body

  try {
    // Check if the study group exists
    const studyGroup = await StudyGroupModel.findById(studyGroupId)
    if (!studyGroup) {
      return res.status(404).json({ error: "Study group not found" })
    }

    // Check if the user is already a member
    const isAlreadyMember = studyGroup.members.some(member => member.userId === userId)
    if (isAlreadyMember) {
      return res.status(400).json({ error: "User is already a member of the study group" })
    }

    // Check if the study group has space for more members
    if (studyGroup.members.length >= studyGroup.maxStudents) {
      return res.status(400).json({ error: "Study group is full" })
    }

    // Add the user to the study group's members list
    studyGroup.members.push({ userId })
    await studyGroup.save()

    res.status(200).json({
      message: "User successfully added to the study group",
      studyGroup
    })
  } catch (error) {
    console.error(error)
    res.status(500).json({ error: "Failed to add user to the study group" })
  }
})

// Remove a user from a study group
router.delete("/:studyGroupId/member/:userId", authMiddleware, async (req, res) => {
  const { studyGroupId, userId } = req.params
  const { requesterId } = req.body // Requester performing the action

  try {
    // Check if the study group exists
    const studyGroup = await StudyGroupModel.findById(studyGroupId)
    if (!studyGroup) {
      return res.status(404).json({ error: "Study group not found" })
    }

    // Check if the requester is authorized (either the user themselves or the creator)
    const isRequesterAuthorized =
      requesterId === userId || requesterId === studyGroup.creatorId
    if (!isRequesterAuthorized) {
      return res.status(403).json({ error: "Unauthorized to remove this user" })
    }

    // Check if the user is a member of the study group
    const memberIndex = studyGroup.members.findIndex(member => member.userId === userId)
    if (memberIndex === -1) {
      return res.status(404).json({ error: "User is not a member of the study group" })
    }

    // Remove the user from the study group
    studyGroup.members.splice(memberIndex, 1)

    // Handle special cases when the creator leaves
    if (userId === studyGroup.creatorId) {
      if (studyGroup.members.length === 0) {
        // If no members remain, delete the study group
        await StudyGroupModel.findByIdAndDelete(studyGroupId)
        return res.status(200).json({ message: "Study group deleted as no members remain" })
      } else {
        // If members remain, assign the next most recent member as the creator
        studyGroup.creatorId = studyGroup.members[0].userId
      }
    }

    // Save the updated study group
    await studyGroup.save()

    res.status(200).json({
      message: "User successfully removed from the study group",
      studyGroup,
    })
  } catch (error) {
    console.error(error)
    res.status(500).json({ error: "Failed to remove user from the study group" })
  }
})

export default router
