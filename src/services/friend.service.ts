import { User } from 'src/domain/user.entity';
import { countryList, getBy } from '../repository/user';
import StandardError from 'src/common/standard-error';
import { ErrorCodes } from 'src/common/error-type';
import { countFriend, create, deleteById, friendList, onlineFriendList, pendingList, sendingList, updateById } from 'src/repository/friend';
import { FriendRequest } from 'src/domain/friend.entity';
import axios from 'axios';



async function searchUserService(user_name: string, data: User) {
    const {
        USER_NAME
    } = data;
    // Request and Sender have not same User Name
    if (user_name === USER_NAME) {
        throw new StandardError(
            ErrorCodes.API_VALIDATION_ERROR,
            "Please Enter Valid User Name."
        );
    }
    // Check Current User Name is Friend Or Not
    let isFriend = await countFriend(user_name, USER_NAME);
    if (isFriend) {
        throw new StandardError(
            ErrorCodes.API_VALIDATION_ERROR,
            "You are already a friend."
        );
    }
    let searchUser = await getBy({ USER_NAME });
    if (!searchUser) {
        throw new StandardError(
            ErrorCodes.API_VALIDATION_ERROR,
            "User Name is not exists."
        );
    }
    return {
        ID: searchUser.ID, USER_NAME: searchUser.USER_NAME,
        AVATAR: searchUser.AVATAR ?? "",
        FB_PROFILE: searchUser.FB_PROFILE ?? "",
        COUNTRY_CODE: searchUser.COUNTRY_CODE ?? "IN",
        FRAME: searchUser.FRAME ?? "",
        IS_SHOW_ONLINE_STATUS: searchUser.IS_SHOW_ONLINE_STATUS,
        ONLINE: searchUser.ONLINE
    }
}


async function sendFriendRequestService(data: any) {
    let sendFriendRequest = await create(data);
    if (!sendFriendRequest) {
        throw new StandardError(
            ErrorCodes.API_VALIDATION_ERROR,
            "Get Error : Send Friend Request."
        );
    }
    return sendFriendRequest;
}


async function approval_decline_friendRequestService(data: any) {
    const {
        STATUS,
        REQUEST_ID
    } = data;
    if (STATUS === "Approve" || STATUS === "Block") {
        await updateById(REQUEST_ID, { STATUS } as FriendRequest);
        return { message: "accepted a friend request.", friendRequestId: REQUEST_ID }
    } else {
        await deleteById(data)
        return { message: "decline a friend request.", friendRequestId: REQUEST_ID }
    }
}


async function list_pending_friendRequestService(id: any) {
    let list = await pendingList({ RECEIVER: id, STATUS: "Pending" });
    return list;
}


async function list_sending_friendRequestService(id: any) {
    let list = await sendingList({ SENDER: id, STATUS: "Pending" });
    return list;
}


async function list_friendService(id: any) {
    try {
        let coinInfo = await axios.get(`http://65.1.114.58/player-profile/get-player-gift/${id}`, {
            headers: {
                "Content-Type": "application/json"
            }
        }) as any;
        coinInfo = coinInfo?.data?.sendReceiveCoin ?? []
        let list = await friendList({ SENDER: id, STATUS: "Approve" });
        const friendInfo = list.map((friendRequest) =>
            friendRequest.SENDER.ID === id ? friendRequest.RECEIVER : friendRequest.SENDER
        );
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
    } catch (error) {
        throw new StandardError(
            ErrorCodes.API_VALIDATION_ERROR,
            "Gift Service is not reachable."
        );
    }

}


async function onlineList_friendService(id: any) {
    let list = await onlineFriendList({ SENDER: id, STATUS: "Approve" });
    const friends = list.map((friendRequest) =>
        friendRequest.SENDER.ID === id ? friendRequest.RECEIVER : friendRequest.SENDER
    );
    return friends?.map(data => {
        return {
            ID: data.ID, USER_NAME: data.USER_NAME,
            AVATAR: data.AVATAR ?? "",
            FB_PROFILE: data.FB_PROFILE ?? "",
            COUNTRY_CODE: data.COUNTRY_CODE ?? "IN",
            FRAME: data.FRAME ?? "",
            IS_SHOW_ONLINE_STATUS: data.IS_SHOW_ONLINE_STATUS,
            ONLINE: data.ONLINE
        }
    })
}

async function myFriendList(id: string) {
    try {
        let list = await friendList({ SENDER: id, STATUS: "Approve" });
        let requestUser = await getBy({ ID: id });
        const friendInfo = list.map((friendRequest) =>
            friendRequest.SENDER.ID === id ? friendRequest.RECEIVER : friendRequest.SENDER
        );
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
    } catch (error) {
        throw new StandardError(
            ErrorCodes.API_VALIDATION_ERROR,
            "Friend Service is not reachable."
        );
    }
}



async function countryUserListService(id: string) {
    try {
        let list = await countryList(id);
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
    } catch (error) {
        throw new StandardError(
            ErrorCodes.API_VALIDATION_ERROR,
            "Country User Service is not reachable."
        );
    }
}


export {
    searchUserService, sendFriendRequestService, approval_decline_friendRequestService,
    list_pending_friendRequestService, list_sending_friendRequestService,
    list_friendService, onlineList_friendService, myFriendList, countryUserListService
};