import express from "express"
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"
import { UsersModel } from "../models/User.js"

const router = express.Router()

// Login endpoint
router.post("/login", async (req, res) => {
  const { email, password } = req.body

  try {
    // Check if the user exists
    const user = await UsersModel.findOne({ email })
    if (!user) {
      return res.status(404).json({ error: "User not found" })
    }

    // Compare passwords
    const isPasswordValid = await bcrypt.compare(password, user.password)
    if (!isPasswordValid) {
      return res.status(401).json({ error: "Invalid email or password" })
    }

    // Generate a JWT
    const payload = { userId: user._id, email: user.email }
    const token = jwt.sign(payload, process.env.JWT_SECRET, {
      expiresIn: process.env.JWT_EXPIRATION || "7d"
    })

    res.status(200).json({
      message: "Login successful",
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
      }
    })
  } catch (error) {
    console.error(error)
    res.status(500).json({ error: "An error occurred during login" })
  }
})

router.get("/me", async (req, res) => {
  const authHeader = req.headers.authorization

  // Check if the Authorization header is provided
  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(401).json({ error: "Unauthorized" })
  }

  const token = authHeader.split(" ")[1] // Extract the token from "Bearer <token>"

  try {
    // Verify the token
    const decoded = jwt.verify(token, process.env.JWT_SECRET)

    // Find the user associated with the token
    const user = await UsersModel.findById(decoded.userId)
    if (!user) {
      return res.status(404).json({ error: "User not found" })
    }

    // Return the user details (excluding sensitive info like the password)
    res.status(200).json({
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
      },
    })
  } catch (error) {
    console.error("Error verifying token:", error)
    res.status(401).json({ error: "Invalid or expired token" })
  }
})

export default router
