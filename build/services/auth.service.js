"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.socialLoginService = socialLoginService;
exports.customRegisterService = customRegisterService;
exports.customLoginService = customLoginService;
exports.mobileService = mobileService;
exports.verifyMobileOtpService = verifyMobileOtpService;
exports.emailService = emailService;
exports.verifyEmailOtpService = verifyEmailOtpService;
exports.resetPassword_mobileService = resetPassword_mobileService;
exports.verifyOtp_resetPassword_mobileService = verifyOtp_resetPassword_mobileService;
exports.resetPassword_emailService = resetPassword_emailService;
exports.verifyOtp_resetPassword_emailService = verifyOtp_resetPassword_emailService;
exports.resetPassword = resetPassword;
exports.guestRegisterService = guestRegisterService;
exports.avatarFBProfileService = avatarFBProfileService;
exports.frameUpdateService = frameUpdateService;
exports.usernameCountryUpdateService = usernameCountryUpdateService;
exports.settingUpdateService = settingUpdateService;
exports.passwordUpdateService = passwordUpdateService;
exports.languageUpdateService = languageUpdateService;
exports.paginationUserService = paginationUserService;
exports.userProfileService = userProfileService;
exports.getMutipleUserService = getMutipleUserService;
exports.guestUserTransferService = guestUserTransferService;
exports.serachInvitedUserClubService = serachInvitedUserClubService;
exports.searchUserNameAndIdService = searchUserNameAndIdService;
const user_entity_1 = require("src/domain/user.entity");
const user_1 = require("../repository/user");
const auth_token_1 = require("src/middleware/auth.token");
const standard_error_1 = __importDefault(require("src/common/standard-error"));
const error_type_1 = require("src/common/error-type");
const typeorm_1 = require("typeorm");
async function socialLoginService(data) {
    let is_login = true;
    const { TYPE } = data;
    if (!(["Facebook", "Gmail", "Apple"].includes(TYPE))) {
        throw new standard_error_1.default(error_type_1.ErrorCodes.API_VALIDATION_ERROR, "Please Verify Login Type.");
    }
    if (!!data.MOBILE_NO) {
        delete data.MOBILE_NO;
    }
    const { USER_ID } = data;
    let login = await (0, user_1.getBy)({ USER_ID, TYPE });
    if (!login) {
        const d = {
            ...data,
            USER_NAME: data.USER_ID
        };
        login = await (0, user_1.create)(d);
        is_login = false;
    }
    let auth_token = await (0, auth_token_1.signAccessToken)(login);
    delete login.DELETED_DATE;
    delete login.PASSWORD;
    delete login.UPDATED_DATE;
    return { auth_token, login, is_login };
}
async function customRegisterService(data) {
    data.MOBILE_NO = data.MOBILE_NO.replace(/[\s\-\(\)]/g, '');
    const { EMAIL, USER_NAME, MOBILE_NO } = data;
    let count = await (0, user_1.countEmail)(EMAIL, USER_NAME, MOBILE_NO);
    if (count) {
        throw new standard_error_1.default(error_type_1.ErrorCodes.API_VALIDATION_ERROR, "Please Use Another Email or User Name.");
    }
    data.TYPE = user_entity_1.UserType.CUSTOM;
    let login = await (0, user_1.create)(data);
    let auth_token = await (0, auth_token_1.signAccessToken)(login);
    delete login.DELETED_DATE;
    delete login.PASSWORD;
    delete login.UPDATED_DATE;
    return { auth_token, login, is_login: false };
}
async function customLoginService(data) {
    const { USER_NAME, PASSWORD } = data;
    let login = await (0, user_1.getBy)({ USER_NAME });
    if (!login) {
        throw new standard_error_1.default(error_type_1.ErrorCodes.API_VALIDATION_ERROR, "This Username is not found Please Register.");
    }
    if (login.PASSWORD !== PASSWORD) {
        throw new standard_error_1.default(error_type_1.ErrorCodes.API_VALIDATION_ERROR, "Please Enter Valid Password.");
    }
    let auth_token = await (0, auth_token_1.signAccessToken)(login);
    delete login.DELETED_DATE;
    delete login.PASSWORD;
    delete login.UPDATED_DATE;
    return { auth_token, login, is_login: true };
}
async function mobileService(data) {
    data.MOBILE_NO = data.MOBILE_NO.replace(/[\s\-\(\)]/g, '');
    const { MOBILE_NO } = data;
    let login = await (0, user_1.getBy)({ MOBILE_NO });
    if (!login) {
        throw new standard_error_1.default(error_type_1.ErrorCodes.API_VALIDATION_ERROR, "Your number is not registered to any account.");
    }
    // Pending OTP Send 
    // await sendSms({ mobile: MOBILE_NO });
    return { is_send_otp: true };
}
async function verifyMobileOtpService(data) {
    data.MOBILE_NO = data.MOBILE_NO.replace(/[\s\-\(\)]/g, '');
    const { MOBILE_NO, OTP } = data;
    let login = await (0, user_1.getBy)({ MOBILE_NO });
    if (!login) {
        throw new standard_error_1.default(error_type_1.ErrorCodes.API_VALIDATION_ERROR, "Your number is not registered to any account.");
    }
    // Pending Verification OTP
    if (OTP !== "123456") {
        throw new standard_error_1.default(error_type_1.ErrorCodes.API_VALIDATION_ERROR, "Your OTP is not valid.");
    }
    let auth_token = await (0, auth_token_1.signAccessToken)(login);
    delete login.DELETED_DATE;
    delete login.PASSWORD;
    delete login.UPDATED_DATE;
    return { auth_token, login, is_login: true };
}
async function emailService(data) {
    const { EMAIL } = data;
    let login = await (0, user_1.getBy)({ EMAIL });
    if (!login) {
        throw new standard_error_1.default(error_type_1.ErrorCodes.API_VALIDATION_ERROR, "Your email is not registered to any account.");
    }
    // Pending OTP Send 
    // await sendEmailUsingSES('otp', { email: EMAIL, otp: otp });
    return { is_send_otp: true };
}
async function verifyEmailOtpService(data) {
    const { EMAIL, OTP } = data;
    let login = await (0, user_1.getBy)({ EMAIL });
    if (!login) {
        throw new standard_error_1.default(error_type_1.ErrorCodes.API_VALIDATION_ERROR, "Your email is not registered to any account.");
    }
    // Pending Verification OTP
    if (OTP !== "123456") {
        throw new standard_error_1.default(error_type_1.ErrorCodes.API_VALIDATION_ERROR, "Your OTP is not valid.");
    }
    let auth_token = await (0, auth_token_1.signAccessToken)(login);
    delete login.DELETED_DATE;
    delete login.PASSWORD;
    delete login.UPDATED_DATE;
    return { auth_token, login, is_login: true };
}
async function resetPassword_mobileService(data) {
    data.MOBILE_NO = data.MOBILE_NO.replace(/[\s\-\(\)]/g, '');
    const { MOBILE_NO } = data;
    let login = await (0, user_1.getBy)({ MOBILE_NO });
    if (!login) {
        throw new standard_error_1.default(error_type_1.ErrorCodes.API_VALIDATION_ERROR, "Your number is not registered to any account.");
    }
    // Pending OTP Send 
    // await sendSms({ mobile: MOBILE_NO });
    return { is_send_otp: true };
}
async function verifyOtp_resetPassword_mobileService(data) {
    data.MOBILE_NO = data.MOBILE_NO.replace(/[\s\-\(\)]/g, '');
    const { MOBILE_NO, OTP } = data;
    let login = await (0, user_1.getBy)({ MOBILE_NO });
    if (!login) {
        throw new standard_error_1.default(error_type_1.ErrorCodes.API_VALIDATION_ERROR, "Your number is not registered to any account.");
    }
    // Pending Verification OTP
    if (OTP !== "123456") {
        throw new standard_error_1.default(error_type_1.ErrorCodes.API_VALIDATION_ERROR, "Your OTP is not valid.");
    }
    return { is_reset: true };
}
async function resetPassword(type, data) {
    if (type === "mobile") {
        data.MOBILE_NO = data.MOBILE_NO.replace(/[\s\-\(\)]/g, '');
        const { MOBILE_NO, PASSWORD } = data;
        let getUser = await (0, user_1.getBy)({ MOBILE_NO });
        if (!getUser) {
            throw new standard_error_1.default(error_type_1.ErrorCodes.API_VALIDATION_ERROR, "Your number is not registered to any account.");
        }
        let reset = {
            ...getUser,
            PASSWORD
        };
        let update = await (0, user_1.updateById)(getUser.ID, reset);
        console.log(update);
        return { is_reset_password: true };
    }
    if (type === "email") {
        const { EMAIL, PASSWORD } = data;
        let getUser = await (0, user_1.getBy)({ EMAIL });
        if (!getUser) {
            throw new standard_error_1.default(error_type_1.ErrorCodes.API_VALIDATION_ERROR, "Your email is not registered to any account.");
        }
        let reset = {
            ...getUser,
            PASSWORD
        };
        let update = await (0, user_1.updateById)(getUser.ID, reset);
        console.log(update);
        return { is_reset_password: true };
    }
    return { is_reset_password: false };
}
async function resetPassword_emailService(data) {
    const { EMAIL } = data;
    let login = await (0, user_1.getBy)({ EMAIL });
    if (!login) {
        throw new standard_error_1.default(error_type_1.ErrorCodes.API_VALIDATION_ERROR, "Your email is not registered to any account.");
    }
    // Pending OTP Send 
    // await sendEmailUsingSES('otp', { email: EMAIL, otp: otp });
    return { is_send_otp: true };
}
async function verifyOtp_resetPassword_emailService(data) {
    const { EMAIL, OTP } = data;
    let login = await (0, user_1.getBy)({ EMAIL });
    if (!login) {
        throw new standard_error_1.default(error_type_1.ErrorCodes.API_VALIDATION_ERROR, "Your email is not registered to any account.");
    }
    // Pending Verification OTP
    if (OTP !== "123456") {
        throw new standard_error_1.default(error_type_1.ErrorCodes.API_VALIDATION_ERROR, "Your OTP is not valid.");
    }
    return { is_reset: true };
}
async function guestRegisterService(data) {
    const { USER_NAME } = data;
    if (!!USER_NAME) {
        let login = await (0, user_1.getBy)({ USER_NAME });
        let auth_token = await (0, auth_token_1.signAccessToken)(login);
        delete login.DELETED_DATE;
        delete login.PASSWORD;
        delete login.UPDATED_DATE;
        return { auth_token, login, is_login: true };
    }
    else {
        const user = new user_entity_1.User();
        user.TYPE = user_entity_1.UserType.GUEST; // Set the user type as GUEST
        let login = await user.save();
        let auth_token = await (0, auth_token_1.signAccessToken)(login);
        delete login.DELETED_DATE;
        delete login.PASSWORD;
        delete login.UPDATED_DATE;
        return { auth_token, login, is_login: false };
    }
}
async function avatarFBProfileService(primaryID, data) {
    let getUser = await (0, user_1.getBy)({ ID: primaryID });
    if (!getUser) {
        throw new standard_error_1.default(error_type_1.ErrorCodes.API_VALIDATION_ERROR, "You  not registered to any account.");
    }
    let reset = {
        ...getUser,
        AVATAR: data?.AVATAR,
        FB_PROFILE: data?.FB_PROFILE
    };
    let update = await (0, user_1.updateById)(getUser.ID, reset);
    console.log(update);
    return { is_update: true };
}
async function frameUpdateService(primaryID, data) {
    let getUser = await (0, user_1.getBy)({ ID: primaryID });
    if (!getUser) {
        throw new standard_error_1.default(error_type_1.ErrorCodes.API_VALIDATION_ERROR, "You  not registered to any account.");
    }
    let reset = {
        ...getUser,
        FRAME: data?.AVATAR
    };
    let update = await (0, user_1.updateById)(getUser.ID, reset);
    console.log(update);
    return { is_update: true };
}
async function usernameCountryUpdateService(primaryID, data) {
    let getUser = await (0, user_1.getBy)({ ID: primaryID });
    if (!getUser) {
        throw new standard_error_1.default(error_type_1.ErrorCodes.API_VALIDATION_ERROR, "You  not registered to any account.");
    }
    if (getUser.USER_NAME !== data.USER_NAME) {
        const isAvailable = await (0, user_1.countUsername)(data.USER_NAME);
        if (isAvailable) {
            throw new standard_error_1.default(error_type_1.ErrorCodes.API_VALIDATION_ERROR, "Username is unavailable .");
        }
    }
    let reset = {
        ...getUser,
        COUNTRY_CODE: data?.COUNTRY_CODE,
        USER_NAME: data?.USER_NAME
    };
    let update = await (0, user_1.updateById)(getUser.ID, reset);
    console.log(update);
    return { is_update: true };
}
async function passwordUpdateService(primaryID, data) {
    if (data.NEW_PASSWORD !== data.CONFIRM_NEW_PASSWORD) {
        throw new standard_error_1.default(error_type_1.ErrorCodes.API_VALIDATION_ERROR, "New Password and Confirm Password must be equal.");
    }
    let getUser = await (0, user_1.getBy)({ ID: primaryID });
    if (!getUser) {
        throw new standard_error_1.default(error_type_1.ErrorCodes.API_VALIDATION_ERROR, "You have not registered to any account.");
    }
    if (!!getUser.PASSWORD) {
        if (getUser.PASSWORD === data.NEW_PASSWORD) {
            throw new standard_error_1.default(error_type_1.ErrorCodes.API_VALIDATION_ERROR, "New Password must be diffrent current password.");
        }
        if (getUser.PASSWORD !== data.OLD_PASSWORD) {
            throw new standard_error_1.default(error_type_1.ErrorCodes.API_VALIDATION_ERROR, "Please Enter Valid Current Password.");
        }
    }
    let reset = {
        ...getUser,
        PASSWORD: data?.NEW_PASSWORD
    };
    let update = await (0, user_1.updateById)(getUser.ID, reset);
    console.log(update);
    return { is_update: true };
}
async function languageUpdateService(primaryID, data) {
    let getUser = await (0, user_1.getBy)({ ID: primaryID });
    if (!getUser) {
        throw new standard_error_1.default(error_type_1.ErrorCodes.API_VALIDATION_ERROR, "You have not registered to any account.");
    }
    let reset = {
        ...getUser,
        LANGUAGE: data?.LANGUAGE
    };
    let update = await (0, user_1.updateById)(getUser.ID, reset);
    console.log(update);
    return { is_update: true };
}
async function settingUpdateService(primaryID, data) {
    let getUser = await (0, user_1.getBy)({ ID: primaryID });
    if (!getUser) {
        throw new standard_error_1.default(error_type_1.ErrorCodes.API_VALIDATION_ERROR, "You have not registered to any account.");
    }
    let reset = {
        ...getUser,
        ...data
    };
    let update = await (0, user_1.updateById)(getUser.ID, reset);
    console.log(update);
    return { is_update: true };
}
async function userProfileService(primaryID) {
    let user = await (0, user_1.getBy)({ ID: primaryID });
    if (!user) {
        throw new standard_error_1.default(error_type_1.ErrorCodes.API_VALIDATION_ERROR, "You not registered to any account.");
    }
    delete user.DELETED_DATE;
    delete user.PASSWORD;
    delete user.UPDATED_DATE;
    delete user.FRAME;
    delete user.LANGUAGE;
    delete user.CREATED_DATE;
    delete user.IS_DISABLE_IN_GAME_CHAT;
    delete user.IS_SOUND;
    delete user.IS_FRIEND_REQUESTS_FROM_OTHERS;
    delete user.LANGUAGE;
    return { user };
}
async function getMutipleUserService(data) {
    let getIds = data.USER_IDS.toString().split(",");
    let users = await (0, user_1.multipleById)(getIds);
    if (!users) {
        throw new standard_error_1.default(error_type_1.ErrorCodes.API_VALIDATION_ERROR, "You not get user inforation.");
    }
    return { users };
}
async function serachInvitedUserClubService(data) {
    let users = await (0, user_1.clubUserSearchById)(data);
    if (!users) {
        throw new standard_error_1.default(error_type_1.ErrorCodes.API_VALIDATION_ERROR, "You not get user inforation.");
    }
    return { users };
}
async function searchUserNameAndIdService(data) {
    let users = await (0, user_1.clubUserSearchById)(data);
    if (!users) {
        throw new standard_error_1.default(error_type_1.ErrorCodes.API_VALIDATION_ERROR, "You not get user inforation.");
    }
    return { searchuser: users };
}
async function paginationUserService(data) {
    const query = {
        order: {
            CREATED_DATE: "DESC"
        },
        take: data.take,
        skip: (data.page - 1) * data.take,
        where: [
            { USER_NAME: (0, typeorm_1.Like)('%' + data.search + '%') },
            { MOBILE_NO: (0, typeorm_1.Like)('%' + data.search + '%') },
            { EMAIL: (0, typeorm_1.Like)('%' + data.search + '%') }
        ],
        select: ['ID', 'AVATAR', 'EMAIL', 'MOBILE_NO', 'USER_NAME', 'ONLINE']
    };
    // console.log(JSON.stringify(query))
    const list = await (0, user_1.paginateList)(query);
    return { listOfUser: list?.[0], total: list?.[1] };
}
async function guestUserTransferService(userId, data) {
    const { TYPE } = data;
    if (!(["Facebook", "Gmail", "Apple"].includes(TYPE))) {
        throw new standard_error_1.default(error_type_1.ErrorCodes.API_VALIDATION_ERROR, "Please Verify Login Type.");
    }
    if (!!data.MOBILE_NO) {
        delete data.MOBILE_NO;
    }
    const { USER_ID } = data;
    let login = await (0, user_1.getBy)({ USER_ID, TYPE });
    if (!!login) {
        // Throw Error
        throw new standard_error_1.default(error_type_1.ErrorCodes.API_VALIDATION_ERROR, `You are aleardy register ${TYPE} account.`);
    }
    let reset = {
        ...data,
        USER_NAME: data.USER_ID
    };
    let update = await (0, user_1.updateById)(userId, reset);
    return { isTransfer: Boolean(update?.affected) ?? false };
}
