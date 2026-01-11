"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.findFriend = findFriend;
exports.sendFriendRequest = sendFriendRequest;
exports.approvalFriendRequest = approvalFriendRequest;
exports.listFriend = listFriend;
exports.pendingFriendRequest = pendingFriendRequest;
exports.sendingFriendRequest = sendingFriendRequest;
exports.onlineListFriend = onlineListFriend;
exports.getFriendId = getFriendId;
exports.leaderBoardFriendUserDetails = leaderBoardFriendUserDetails;
exports.leaderBoardCountryUserDetails = leaderBoardCountryUserDetails;
exports.leaderBoardUserDetails = leaderBoardUserDetails;
exports.serachInvitedUserClub = serachInvitedUserClub;
exports.searchUserNameAndId = searchUserNameAndId;
const encrypt_1 = require("src/common/encrypt");
const auth_service_1 = require("src/services/auth.service");
const friend_service_1 = require("src/services/friend.service");
async function findFriend(req, res, next) {
    try {
        const { token } = req.body;
        const { username: USER_NAME } = req.query;
        let searchUser = await (0, friend_service_1.searchUserService)(token?.USER_NAME, { USER_NAME });
        return res.send(await (0, encrypt_1.encrypt)(JSON.stringify({ status: true, message: "", searchUser })));
    }
    catch (error) {
        let message = error?.message ?? "";
        return res.json(await (0, encrypt_1.encrypt)(JSON.stringify({ status: false, message: message })));
    }
}
async function sendFriendRequest(req, res, next) {
    try {
        const { token } = req.body;
        const { userid: ID } = req.query;
        let sendFriendRequest = await (0, friend_service_1.sendFriendRequestService)({ SENDER: token?.ID, RECEIVER: ID });
        return res.send(await (0, encrypt_1.encrypt)(JSON.stringify({ status: true, message: "", sendFriendRequest })));
    }
    catch (error) {
        let message = error?.message ?? "";
        return res.json(await (0, encrypt_1.encrypt)(JSON.stringify({ status: false, message: message })));
    }
}
async function approvalFriendRequest(req, res, next) {
    try {
        const { requestid: REQUEST_ID, status: STATUS } = req.query;
        let approvalRequestFriend = await (0, friend_service_1.approval_decline_friendRequestService)({ STATUS, REQUEST_ID });
        return res.send(await (0, encrypt_1.encrypt)(JSON.stringify({ status: true, message: approvalRequestFriend?.message, friendRequestId: approvalRequestFriend?.friendRequestId })));
        // return res.send({ status: true, message: approvalRequestFriend?.message, friendRequestId: approvalRequestFriend?.friendRequestId });
    }
    catch (error) {
        let message = error?.message ?? "";
        return res.json(await (0, encrypt_1.encrypt)(JSON.stringify({ status: false, message: message })));
    }
}
async function listFriend(req, res, next) {
    try {
        const { token } = req.body;
        let friends = await (0, friend_service_1.list_friendService)(token?.ID);
        return res.send(await (0, encrypt_1.encrypt)(JSON.stringify({ status: true, message: "", friends })));
    }
    catch (error) {
        let message = error?.message ?? "";
        return res.json(await (0, encrypt_1.encrypt)(JSON.stringify({ status: false, message: message })));
    }
}
async function getFriendId(req, res, next) {
    try {
        const { token } = req.body;
        let friends = await (0, friend_service_1.list_friendService)(token?.ID);
        return res.send({ status: true, message: "", friends });
    }
    catch (error) {
        let message = error?.message ?? "";
        return res.json(await (0, encrypt_1.encrypt)(JSON.stringify({ status: false, message: message })));
    }
}
async function pendingFriendRequest(req, res, next) {
    try {
        const { token } = req.body;
        let pendingFriend = await (0, friend_service_1.list_pending_friendRequestService)(token?.ID);
        return res.send(await (0, encrypt_1.encrypt)(JSON.stringify({ status: true, message: "", pendingFriend })));
    }
    catch (error) {
        let message = error?.message ?? "";
        return res.json(await (0, encrypt_1.encrypt)(JSON.stringify({ status: false, message: message })));
    }
}
async function sendingFriendRequest(req, res, next) {
    try {
        const { token } = req.body;
        let sendingFriend = await (0, friend_service_1.list_sending_friendRequestService)(token?.ID);
        return res.send(await (0, encrypt_1.encrypt)(JSON.stringify({ status: true, message: "", sendingFriend })));
    }
    catch (error) {
        let message = error?.message ?? "";
        return res.json(await (0, encrypt_1.encrypt)(JSON.stringify({ status: false, message: message })));
    }
}
async function onlineListFriend(req, res, next) {
    try {
        const { token } = req.body;
        let friends = await (0, friend_service_1.onlineList_friendService)(token?.ID);
        return res.send(await (0, encrypt_1.encrypt)(JSON.stringify({ status: true, message: "", friends })));
    }
    catch (error) {
        let message = error?.message ?? "";
        return res.json(await (0, encrypt_1.encrypt)(JSON.stringify({ status: false, message: message })));
    }
}
async function leaderBoardFriendUserDetails(req, res, next) {
    try {
        const { id: USER_ID } = req.params;
        let { friends, currentUser } = await (0, friend_service_1.myFriendList)(USER_ID);
        return res.send({ status: true, friends, currentUser });
        // return res.json({ status: true, data: await encrypt(JSON.stringify(mutipleUsers)) });
    }
    catch (error) {
        let message = error?.message ?? "";
        return res.json({ status: false, message: message });
    }
}
async function leaderBoardCountryUserDetails(req, res, next) {
    try {
        const { id: countryCode } = req.params;
        let { users } = await (0, friend_service_1.countryUserListService)(countryCode);
        return res.send({ status: true, users });
    }
    catch (error) {
        let message = error?.message ?? "";
        return res.json({ status: false, message: message });
    }
}
async function leaderBoardUserDetails(req, res, next) {
    try {
        const { userId } = req.body;
        console.log(req.body);
        let { users } = await (0, auth_service_1.getMutipleUserService)({ USER_IDS: userId.toString() });
        return res.send({ status: true, users });
    }
    catch (error) {
        let message = error?.message ?? "";
        return res.json({ status: false, message: message });
    }
}
async function serachInvitedUserClub(req, res, next) {
    try {
        const { name_id, userId } = req.body;
        let { users } = await (0, auth_service_1.serachInvitedUserClubService)({ name_id, userId });
        return res.send({ status: true, users });
    }
    catch (error) {
        let message = error?.message ?? "";
        return res.json({ status: false, message: message });
    }
}
async function searchUserNameAndId(req, res, next) {
    try {
        const { name_id } = req.query;
        let { searchuser } = await (0, auth_service_1.searchUserNameAndIdService)({ name_id });
        // return res.send({ status: true, searchuser });
        return res.send(await (0, encrypt_1.encrypt)(JSON.stringify({ status: true, searchuser })));
    }
    catch (error) {
        let message = error?.message ?? "";
        return res.json({ status: false, message: message });
    }
}
