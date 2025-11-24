import express from "express"
import { protectRoute } from "../middleware/auth.middleware.js"


const router = express.Router()

router.use(protectRoute)


router.get("/",getRecommendedUsers)
router.get("/friends", getMyfriends)

export default router;