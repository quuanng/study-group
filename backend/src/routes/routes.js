import { Router } from "express"
import userRouter from "./User.js"
import classRouter from "./Class.js"
import studyGroupRouter from "./StudyGroup.js"
import loginRouter from "./Login.js"
import chatRouter from "./Chat.js"

const router = Router()

router.use('/user', userRouter)
router.use('/class', classRouter)
router.use('/study-group', studyGroupRouter)
router.use('/login', loginRouter)
router.use('/chat', chatRouter)

export default router