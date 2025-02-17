import jwt from "jsonwebtoken"

const authMiddleware = (req, res, next) => {
  const authHeader = req.headers.authorization

  // Check if the Authorization header exists
  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(401).json({ error: "Unauthorized: No token provided" })
  }

  const token = authHeader.split(" ")[1] // Extract the token

  try {
    // Verify the token
    const decoded = jwt.verify(token, process.env.JWT_SECRET)

    // Attach the user data to the request object
    req.user = decoded
    next() // Proceed to the next middleware or route handler
  } catch (error) {
    console.error(error)
    res.status(401).json({ error: "Unauthorized: Invalid token" })
  }
}

export default authMiddleware
