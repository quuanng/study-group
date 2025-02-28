import express from 'express'
import cors from 'cors'
import mongoose from 'mongoose'
import dotenv from "dotenv"
dotenv.config()
import routesRouter from "./routes/routes.js"

const app = express()
const port = process.env.PORT || 8240;

app.use(cors())
app.use(express.json())

mongoose.connect(process.env.MONGODB_URI)
.then(() => console.log('MongoDB connected successfully'))
.catch(err => console.log('MongoDB connection error:', err))

app.get('/', (req, res) => {
    res.json("hello quang")
})

app.use('/api', routesRouter)

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`)
})