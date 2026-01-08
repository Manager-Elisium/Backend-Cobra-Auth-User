import { Response, Request, NextFunction } from "express";
import { encrypt, decrypt } from "src/common/encrypt";
import { User } from "src/domain/user.entity";
import { getMutipleUserService, searchUserNameAndIdService, serachInvitedUserClubService } from "src/services/auth.service";
import { approval_decline_friendRequestService, countryUserListService, list_friendService, list_pending_friendRequestService, list_sending_friendRequestService, myFriendList, onlineList_friendService, searchUserService, sendFriendRequestService } from "src/services/friend.service";

async function findFriend(req: Request, res: Response, next: NextFunction) {
    try {
        const { token } = req.body;
        const { username: USER_NAME } = req.query;
        let searchUser = await searchUserService(token?.USER_NAME, { USER_NAME } as User);
        return res.send(await encrypt(JSON.stringify({ status: true, message: "", searchUser })));
    } catch (error) {
        let message = error?.message ?? "";
        return res.json(await encrypt(JSON.stringify({ status: false, message: message })));
    }
}


async function sendFriendRequest(req: Request, res: Response, next: NextFunction) {
    try {
        const { token } = req.body;
        const { userid: ID } = req.query;
        let sendFriendRequest = await sendFriendRequestService({ SENDER: token?.ID, RECEIVER: ID });
        return res.send(await encrypt(JSON.stringify({ status: true, message: "", sendFriendRequest })));
    } catch (error) {
        let message = error?.message ?? "";
        return res.json(await encrypt(JSON.stringify({ status: false, message: message })));
    }
}



async function approvalFriendRequest(req: Request, res: Response, next: NextFunction) {
    try {
        const { requestid: REQUEST_ID, status: STATUS } = req.query;
        let approvalRequestFriend = await approval_decline_friendRequestService({ STATUS, REQUEST_ID });
        return res.send(await encrypt(JSON.stringify({ status: true, message: approvalRequestFriend?.message, friendRequestId: approvalRequestFriend?.friendRequestId })));
        // return res.send({ status: true, message: approvalRequestFriend?.message, friendRequestId: approvalRequestFriend?.friendRequestId });
    } catch (error) {
        let message = error?.message ?? "";
        return res.json(await encrypt(JSON.stringify({ status: false, message: message })));
    }
}


async function listFriend(req: Request, res: Response, next: NextFunction) {
    try {
        const { token } = req.body;
        let friends = await list_friendService(token?.ID);
        return res.send(await encrypt(JSON.stringify({ status: true, message: "", friends })));
    } catch (error) {
        let message = error?.message ?? "";
        return res.json(await encrypt(JSON.stringify({ status: false, message: message })));
    }
}


async function getFriendId(req: Request, res: Response, next: NextFunction) {
    try {
        const { token } = req.body;
        let friends = await list_friendService(token?.ID);
        return res.send({ status: true, message: "", friends });
    } catch (error) {
        let message = error?.message ?? "";
        return res.json(await encrypt(JSON.stringify({ status: false, message: message })));
    }
}


async function pendingFriendRequest(req: Request, res: Response, next: NextFunction) {
    try {
        const { token } = req.body;
        let pendingFriend = await list_pending_friendRequestService(token?.ID);
        return res.send(await encrypt(JSON.stringify({ status: true, message: "", pendingFriend })));
    } catch (error) {
        let message = error?.message ?? "";
        return res.json(await encrypt(JSON.stringify({ status: false, message: message })));
    }
}


async function sendingFriendRequest(req: Request, res: Response, next: NextFunction) {
    try {
        const { token } = req.body;
        let sendingFriend = await list_sending_friendRequestService(token?.ID);
        return res.send(await encrypt(JSON.stringify({ status: true, message: "", sendingFriend })));
    } catch (error) {
        let message = error?.message ?? "";
        return res.json(await encrypt(JSON.stringify({ status: false, message: message })));
    }
}


async function onlineListFriend(req: Request, res: Response, next: NextFunction) {
    try {
        const { token } = req.body;
        let friends = await onlineList_friendService(token?.ID);
        return res.send(await encrypt(JSON.stringify({ status: true, message: "", friends })));
    } catch (error) {
        let message = error?.message ?? "";
        return res.json(await encrypt(JSON.stringify({ status: false, message: message })));
    }
}


async function leaderBoardFriendUserDetails(req: Request, res: Response, next: NextFunction) {
    try {
        const { id: USER_ID } = req.params;
        let { friends, currentUser } = await myFriendList(USER_ID);
        return res.send({ status: true, friends, currentUser });
        // return res.json({ status: true, data: await encrypt(JSON.stringify(mutipleUsers)) });
    } catch (error) {
        let message = error?.message ?? "";
        return res.json({ status: false, message: message });
    }
}



async function leaderBoardCountryUserDetails(req: Request, res: Response, next: NextFunction) {
    try {
        const { id: countryCode } = req.params;
        let { users } = await countryUserListService(countryCode);
        return res.send({ status: true, users });
    } catch (error) {
        let message = error?.message ?? "";
        return res.json({ status: false, message: message });
    }
}


async function leaderBoardUserDetails(req: Request, res: Response, next: NextFunction) {
    try {
        const { userId } = req.body;
        console.log(req.body)
        let { users } = await getMutipleUserService({ USER_IDS: userId.toString() });
        return res.send({ status: true, users });
    } catch (error) {
        let message = error?.message ?? "";
        return res.json({ status: false, message: message });
    }
}


async function serachInvitedUserClub(req: Request, res: Response, next: NextFunction) {
    try {
        const { name_id, userId } = req.body;
        let { users } = await serachInvitedUserClubService({ name_id, userId });
        return res.send({ status: true, users });
    } catch (error) {
        let message = error?.message ?? "";
        return res.json({ status: false, message: message });
    }
}



async function searchUserNameAndId(req: Request, res: Response, next: NextFunction) {
    try {
        const { name_id } = req.query;
        let { searchuser } = await searchUserNameAndIdService({ name_id });
        // return res.send({ status: true, searchuser });
        return res.send(await encrypt(JSON.stringify({ status: true, searchuser })));
    } catch (error) {
        let message = error?.message ?? "";
        return res.json({ status: false, message: message });
    }
}

export {
    findFriend, sendFriendRequest, approvalFriendRequest,
    listFriend, pendingFriendRequest, sendingFriendRequest,
    onlineListFriend, getFriendId,
    leaderBoardFriendUserDetails, leaderBoardCountryUserDetails, leaderBoardUserDetails,

    serachInvitedUserClub, searchUserNameAndId
};