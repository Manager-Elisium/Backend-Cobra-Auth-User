import express from "express";
import { approvalFriendRequest, findFriend, getFriendId, leaderBoardCountryUserDetails, leaderBoardFriendUserDetails, leaderBoardUserDetails, listFriend, onlineListFriend, pendingFriendRequest, searchUserNameAndId, sendFriendRequest, sendingFriendRequest, serachInvitedUserClub } from "src/controller/friend";
let router = express.Router();

import { verifyAccessToken } from "src/middleware/auth.token";

router.get("/search", verifyAccessToken, findFriend);

router.get("/send-request", verifyAccessToken, sendFriendRequest);

router.get("/approval-request", verifyAccessToken, approvalFriendRequest);

router.get("/pending-friend-list", verifyAccessToken, pendingFriendRequest);

router.get("/sending-friend-list", verifyAccessToken, sendingFriendRequest);

router.get("/friend-list", verifyAccessToken, listFriend);

router.get("/get-friend-id-list", verifyAccessToken, getFriendId);

router.get("/online-friend-list", verifyAccessToken, onlineListFriend);


router.get("/my-friend-list/:id", leaderBoardFriendUserDetails);

router.get("/country-user-list/:id", leaderBoardCountryUserDetails);

router.post("/list-user-details", leaderBoardUserDetails);

router.post("/search-invite-club-user", serachInvitedUserClub);

router.get("/search-user", verifyAccessToken, searchUserNameAndId);

export { router as FriendRouter };