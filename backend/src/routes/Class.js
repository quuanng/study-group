import { Router } from "express"
import { ClassModel } from "../models/Class.js"
import authMiddleware from "../middleware/authMiddleware.js"

const router = Router()

// Add a new class
router.post("/add", async (req, res) => {
  const { subject, catalog_number, full_name, descr, saves } = req.body
  try {
    // Check if the class already exists in the database
    const existingClass = await ClassModel.findOne({ subject, catalog_number })
    if (existingClass) {
      return res.status(400).json({ error: "Class already exists in the database" })
    }
    // If it doesn't exist, add the new class
    const newClass = new ClassModel({ subject, catalog_number, full_name, descr, saves })
    await newClass.save()
    res.status(201).json({ message: "Class added successfully", class: newClass })
  } catch (error) {
    console.error(error)
    res.status(500).json({ error: "Failed to add class" })
  }
})


/*
// Search for a course with suggestions
router.get("/search", async (req, res) => {
  const { query } = req.query

  if (!query) {
    return res.status(400).json({ error: "Query parameter is required" })
  }

  try {
    // Fetch all courses and calculate similarity based on `query`
    const classes = await ClassModel.find()
    const results = classes
      .map((cls) => {
        const similarity = calculateSimilarity(query.toLowerCase(), cls.className.toLowerCase())
        return { className: cls.className, instructor: cls.instructor, similarity }
      })
      .filter((cls) => cls.similarity > 0) // Include only relevant results
      .sort((a, b) => b.similarity - a.similarity) // Sort by similarity
      .slice(0, 5) // Limit to 5 suggestions

    res.status(200).json(results)
  } catch (error) {
    console.error(error)
    res.status(500).json({ error: "Failed to search for classes" })
  }
})

// Function to calculate similarity between two strings
const calculateSimilarity = (query, target) => {
  const queryLength = query.length
  const matchLength = target.startsWith(query) ? queryLength : 0
  return matchLength / target.length // Basic similarity score
}
*/

export default router
