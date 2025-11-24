import express from "express"
import { protectRoute } from "../middleware/auth.middleware.js"
import { getMyfriends, getRecommendedUsers , sendFriendRequest , acceptFriendRequest} from "../controller/user.controller.js"

const router = express.Router()

router.use(protectRoute)


router.get("/",getRecommendedUsers)
router.get("/friends", getMyfriends)
router.post("/friend-request/:id", sendFriendRequest)
router.post("/friend-request/:id/accept", acceptFriendRequest)

export default router;