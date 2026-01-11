"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.create = create;
exports.updateById = updateById;
exports.deleteById = deleteById;
exports.pendingList = pendingList;
exports.friendList = friendList;
exports.countFriend = countFriend;
exports.sendingList = sendingList;
exports.onlineFriendList = onlineFriendList;
const friend_entity_1 = require("src/domain/friend.entity");
async function create(data) {
    return friend_entity_1.FriendRequest.save(data);
}
async function updateById(id, data) {
    return friend_entity_1.FriendRequest.update(id, data);
}
async function deleteById(data) {
    return await friend_entity_1.FriendRequest.createQueryBuilder()
        .delete()
        .from(friend_entity_1.FriendRequest)
        .where("REQUEST_ID = :REQUEST_ID", { REQUEST_ID: data.REQUEST_ID })
        .execute();
}
async function pendingList(data) {
    return await friend_entity_1.FriendRequest.find({
        where: {
            RECEIVER: { ID: data.RECEIVER },
            STATUS: data.STATUS
        },
        relations: ['SENDER'],
        select: {
            "REQUEST_ID": true,
            "STATUS": true,
            "CREATED_DATE": true,
            "SENDER": {
                "ID": true,
                "USER_NAME": true,
                "AVATAR": true,
                "FB_PROFILE": true,
                "COUNTRY_CODE": true,
                "FRAME": true,
                "IS_SHOW_ONLINE_STATUS": true,
                "ONLINE": true
            }
        }
    });
}
async function sendingList(data) {
    return await friend_entity_1.FriendRequest.find({
        where: {
            SENDER: { ID: data.SENDER },
            STATUS: data.STATUS
        },
        relations: ['RECEIVER'],
        select: {
            "REQUEST_ID": true,
            "STATUS": true,
            "CREATED_DATE": true,
            "RECEIVER": {
                "ID": true,
                "USER_NAME": true,
                "AVATAR": true,
                "FB_PROFILE": true,
                "COUNTRY_CODE": true,
                "FRAME": true,
                "IS_SHOW_ONLINE_STATUS": true,
                "ONLINE": true
            }
        }
    });
}
async function friendList(data) {
    return await friend_entity_1.FriendRequest.find({
        where: [
            { SENDER: { ID: data.SENDER }, STATUS: data.STATUS },
            { RECEIVER: { ID: data.SENDER }, STATUS: data.STATUS }
        ],
        relations: ['SENDER', 'RECEIVER']
    });
}
async function countFriend(user_name, USER_NAME) {
    return friend_entity_1.FriendRequest.count({
        where: [
            { SENDER: { USER_NAME: user_name }, RECEIVER: { USER_NAME: USER_NAME } },
            { RECEIVER: { USER_NAME: user_name }, SENDER: { USER_NAME: USER_NAME } }
        ]
    });
}
async function onlineFriendList(data) {
    return await friend_entity_1.FriendRequest.find({
        where: [
            { SENDER: { ID: data.SENDER, ONLINE: true }, STATUS: data.STATUS },
            { RECEIVER: { ID: data.SENDER, ONLINE: true }, STATUS: data.STATUS }
        ],
        relations: ['SENDER', 'RECEIVER'],
    });
}
