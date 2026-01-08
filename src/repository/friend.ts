import { FriendRequest } from "src/domain/friend.entity";
import { FindOptionsWhere, In } from "typeorm";

async function create(data: FriendRequest) {
    return FriendRequest.save(data);
}

async function updateById(id: string, data: FriendRequest) {
    return FriendRequest.update(id, data)
}

async function deleteById(data: FindOptionsWhere<FriendRequest>) {
    return await FriendRequest.createQueryBuilder()
        .delete()
        .from(FriendRequest)
        .where("REQUEST_ID = :REQUEST_ID", { REQUEST_ID: data.REQUEST_ID })
        .execute();
}


async function pendingList(data: any) {
    return await FriendRequest.find({
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
    })
}


async function sendingList(data: any) {
    return await FriendRequest.find({
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
    })
}


async function friendList(data: any) {
    return await FriendRequest.find({
        where: [
            { SENDER: { ID: data.SENDER }, STATUS: data.STATUS },
            { RECEIVER: { ID: data.SENDER }, STATUS: data.STATUS }
        ],
        relations: ['SENDER', 'RECEIVER']
    })
}

async function countFriend(user_name: string, USER_NAME: string) {
    return FriendRequest.count({
        where: [
            { SENDER: { USER_NAME: user_name }, RECEIVER: { USER_NAME: USER_NAME } },
            { RECEIVER: { USER_NAME: user_name }, SENDER: { USER_NAME: USER_NAME } }
        ]
    })
}



async function onlineFriendList(data: any) {
    return await FriendRequest.find({
        where: [
            { SENDER: { ID: data.SENDER, ONLINE: true }, STATUS: data.STATUS },
            { RECEIVER: { ID: data.SENDER, ONLINE: true }, STATUS: data.STATUS }
        ],
        relations: ['SENDER', 'RECEIVER'],
    })
}


export { create, updateById, deleteById, pendingList, friendList, countFriend, sendingList, onlineFriendList };
