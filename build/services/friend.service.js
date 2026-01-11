"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.searchUserService = searchUserService;
exports.sendFriendRequestService = sendFriendRequestService;
exports.approval_decline_friendRequestService = approval_decline_friendRequestService;
exports.list_pending_friendRequestService = list_pending_friendRequestService;
exports.list_sending_friendRequestService = list_sending_friendRequestService;
exports.list_friendService = list_friendService;
exports.onlineList_friendService = onlineList_friendService;
exports.myFriendList = myFriendList;
exports.countryUserListService = countryUserListService;
const user_1 = require("../repository/user");
const standard_error_1 = __importDefault(require("src/common/standard-error"));
const error_type_1 = require("src/common/error-type");
const friend_1 = require("src/repository/friend");
const axios_1 = __importDefault(require("axios"));
async function searchUserService(user_name, data) {
    const { USER_NAME } = data;
    // Request and Sender have not same User Name
    if (user_name === USER_NAME) {
        throw new standard_error_1.default(error_type_1.ErrorCodes.API_VALIDATION_ERROR, "Please Enter Valid User Name.");
    }
    // Check Current User Name is Friend Or Not
    let isFriend = await (0, friend_1.countFriend)(user_name, USER_NAME);
    if (isFriend) {
        throw new standard_error_1.default(error_type_1.ErrorCodes.API_VALIDATION_ERROR, "You are already a friend.");
    }
    let searchUser = await (0, user_1.getBy)({ USER_NAME });
    if (!searchUser) {
        throw new standard_error_1.default(error_type_1.ErrorCodes.API_VALIDATION_ERROR, "User Name is not exists.");
    }
    return {
        ID: searchUser.ID, USER_NAME: searchUser.USER_NAME,
        AVATAR: searchUser.AVATAR ?? "",
        FB_PROFILE: searchUser.FB_PROFILE ?? "",
        COUNTRY_CODE: searchUser.COUNTRY_CODE ?? "IN",
        FRAME: searchUser.FRAME ?? "",
        IS_SHOW_ONLINE_STATUS: searchUser.IS_SHOW_ONLINE_STATUS,
        ONLINE: searchUser.ONLINE
    };
}
async function sendFriendRequestService(data) {
    let sendFriendRequest = await (0, friend_1.create)(data);
    if (!sendFriendRequest) {
        throw new standard_error_1.default(error_type_1.ErrorCodes.API_VALIDATION_ERROR, "Get Error : Send Friend Request.");
    }
    return sendFriendRequest;
}
async function approval_decline_friendRequestService(data) {
    const { STATUS, REQUEST_ID } = data;
    if (STATUS === "Approve" || STATUS === "Block") {
        await (0, friend_1.updateById)(REQUEST_ID, { STATUS });
        return { message: "accepted a friend request.", friendRequestId: REQUEST_ID };
    }
    else {
        await (0, friend_1.deleteById)(data);
        return { message: "decline a friend request.", friendRequestId: REQUEST_ID };
    }
}
async function list_pending_friendRequestService(id) {
    let list = await (0, friend_1.pendingList)({ RECEIVER: id, STATUS: "Pending" });
    return list;
}
async function list_sending_friendRequestService(id) {
    let list = await (0, friend_1.sendingList)({ SENDER: id, STATUS: "Pending" });
    return list;
}
async function list_friendService(id) {
    try {
        let coinInfo = await axios_1.default.get(`http://192.168.1.46:3004/player-profile/get-player-gift/${id}`, {
            headers: {
                "Content-Type": "application/json"
            }
        });
        coinInfo = coinInfo?.data?.sendReceiveCoin ?? [];
        let list = await (0, friend_1.friendList)({ SENDER: id, STATUS: "Approve" });
        const friendInfo = list.map((friendRequest) => friendRequest.SENDER.ID === id ? friendRequest.RECEIVER : friendRequest.SENDER);
        const friends = friendInfo.map((friend) => ({
            ID: friend.ID,
            USER_NAME: friend.USER_NAME,
            FRAME: friend.FRAME ?? "",
            AVATAR: friend.AVATAR ?? "",
            FB_PROFILE: friend.FB_PROFILE ?? "",
            COUNTRY_CODE: friend.COUNTRY_CODE ?? "IN",
            ONLINE: friend.ONLINE ?? "",
            ...coinInfo.find((user) => user.ID === friend.ID),
        }));
        return friends;
    }
    catch (error) {
        throw new standard_error_1.default(error_type_1.ErrorCodes.API_VALIDATION_ERROR, "Gift Service is not reachable.");
    }
}
async function onlineList_friendService(id) {
    let list = await (0, friend_1.onlineFriendList)({ SENDER: id, STATUS: "Approve" });
    const friends = list.map((friendRequest) => friendRequest.SENDER.ID === id ? friendRequest.RECEIVER : friendRequest.SENDER);
    return friends?.map(data => {
        return {
            ID: data.ID, USER_NAME: data.USER_NAME,
            AVATAR: data.AVATAR ?? "",
            FB_PROFILE: data.FB_PROFILE ?? "",
            COUNTRY_CODE: data.COUNTRY_CODE ?? "IN",
            FRAME: data.FRAME ?? "",
            IS_SHOW_ONLINE_STATUS: data.IS_SHOW_ONLINE_STATUS,
            ONLINE: data.ONLINE
        };
    });
}
async function myFriendList(id) {
    try {
        let list = await (0, friend_1.friendList)({ SENDER: id, STATUS: "Approve" });
        let requestUser = await (0, user_1.getBy)({ ID: id });
        const friendInfo = list.map((friendRequest) => friendRequest.SENDER.ID === id ? friendRequest.RECEIVER : friendRequest.SENDER);
        const friends = friendInfo.map((friend) => ({
            ID: friend.ID,
            USER_NAME: friend.USER_NAME,
            FRAME: friend.FRAME ?? "",
            AVATAR: friend.AVATAR ?? "",
            FB_PROFILE: friend.FB_PROFILE ?? "",
            COUNTRY_CODE: friend.COUNTRY_CODE ?? "IN",
            ONLINE: friend.ONLINE ?? ""
        }));
        return {
            friends, currentUser: {
                ID: requestUser.ID,
                USER_NAME: requestUser.USER_NAME,
                FRAME: requestUser.FRAME ?? "",
                AVATAR: requestUser.AVATAR ?? "",
                FB_PROFILE: requestUser.FB_PROFILE ?? "",
                COUNTRY_CODE: requestUser.COUNTRY_CODE ?? "IN",
                ONLINE: requestUser.ONLINE ?? ""
            }
        };
    }
    catch (error) {
        throw new standard_error_1.default(error_type_1.ErrorCodes.API_VALIDATION_ERROR, "Friend Service is not reachable.");
    }
}
async function countryUserListService(id) {
    try {
        let list = await (0, user_1.countryList)(id);
        const users = list.map((friend) => ({
            ID: friend.ID,
            USER_NAME: friend.USER_NAME,
            FRAME: friend.FRAME ?? "",
            AVATAR: friend.AVATAR ?? "",
            FB_PROFILE: friend.FB_PROFILE ?? "",
            COUNTRY_CODE: friend.COUNTRY_CODE ?? "IN",
            ONLINE: friend.ONLINE ?? ""
        }));
        return { users };
    }
    catch (error) {
        throw new standard_error_1.default(error_type_1.ErrorCodes.API_VALIDATION_ERROR, "Country User Service is not reachable.");
    }
}
