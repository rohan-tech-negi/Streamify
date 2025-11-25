import express from "express"
import { protectRoute } from "../middleware/auth.middleware.js"
import { getMyfriends, getRecommendedUsers , sendFriendRequest , acceptFriendRequest, getFriendRequest , getOutgoingFriendReqs} from "../controller/user.controller.js"

const router = express.Router()

router.use(protectRoute)


router.get("/",getRecommendedUsers)
router.get("/friends", getMyfriends)
router.post("/friend-request/:id", sendFriendRequest)
router.post("/friend-request/:id/accept", acceptFriendRequest)
router.post("/friend-request", getFriendRequest)
router.post("/outgoing-friend-request", getOutgoingFriendReqs)
export default router;