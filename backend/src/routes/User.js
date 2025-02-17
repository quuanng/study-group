import { Router } from "express"
import { UsersModel } from "../models/User.js"
import bcrypt from "bcrypt"

const router = Router()

// Make a new user
router.post("/add", async (req, res) => {
    const { name, email, password } = req.body
  
    try {
      // Check if the email already exists
      const existingUser = await UsersModel.findOne({ email })
      if (existingUser) {
        return res.status(409).json({ error: "Email already exists" })
      }

      const saltRounds = 10
      const hashedPassword = await bcrypt.hash(password, saltRounds)
  
      // Create and save the new user
      const newUser = new UsersModel({ name, email, password: hashedPassword })
      await newUser.save()
  
      res.status(201).json({ message: "User added successfully", user: newUser })
    } catch (error) {
      console.error(error)
      res.status(500).json({ error: "Failed to add user" })
    }
})

// Get user information by id
router.get("/:id", async (req, res) => {
    const { id } = req.params
  
    try {
      // Find user by ID
      const user = await UsersModel.findById(id)
  
      if (!user) {
        return res.status(404).json({ error: "User not found" })
      }
  
      res.status(200).json({ user })
    } catch (error) {
      console.error(error)
  
      // Handle invalid IDs or other errors
      if (error.kind === "ObjectId") {
        return res.status(400).json({ error: "Invalid user ID format" })
      }
  
      res.status(500).json({ error: "Failed to fetch user" })
    }
})

router.get("/read", async (req, res) => {
    try {
        const response = await UsersModel.find()
        res.json(response)
    } catch (e) {
        res.json(e)
    }
})

export default router