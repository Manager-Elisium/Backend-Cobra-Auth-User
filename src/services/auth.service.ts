import { User, UserType } from 'src/domain/user.entity';
import { clubUserSearchById, countEmail, countUsername, create, getBy, multipleById, paginateList, updateById } from '../repository/user';
import { signAccessToken } from 'src/middleware/auth.token';
import StandardError from 'src/common/standard-error';
import { ErrorCodes } from 'src/common/error-type';
import { sendSms } from 'src/common/sms.otp';
import { sendEmailUsingSES } from 'src/common/email.otp';
import { Like } from 'typeorm';


async function socialLoginService(data: User) {
    let is_login = true;
    const {
        TYPE
    } = data;
    if (!(["Facebook", "Gmail", "Apple"].includes(TYPE))) {
        throw new StandardError(
            ErrorCodes.API_VALIDATION_ERROR,
            "Please Verify Login Type."
        );
    }
    if (!!data.MOBILE_NO) {
        delete data.MOBILE_NO;
    }
    const { USER_ID } = data;
    let login = await getBy({ USER_ID, TYPE });
    if (!login) {
        const d = {
            ...data,
            USER_NAME: data.USER_ID
        } as User;
        login = await create(d)
        is_login = false;
    }
    let auth_token = await signAccessToken(login);
    delete login.DELETED_DATE;
    delete login.PASSWORD;
    delete login.UPDATED_DATE;
    return { auth_token, login, is_login };
}


async function customRegisterService(data: User) {
    data.MOBILE_NO = data.MOBILE_NO.replace(/[\s\-\(\)]/g, '');
    const { EMAIL, USER_NAME, MOBILE_NO } = data;
    let count = await countEmail(EMAIL, USER_NAME, MOBILE_NO);
    if (count) {
        throw new StandardError(
            ErrorCodes.API_VALIDATION_ERROR,
            "Please Use Another Email or User Name."
        );
    }
    data.TYPE = UserType.CUSTOM;
    let login = await create(data);
    let auth_token = await signAccessToken(login);
    delete login.DELETED_DATE;
    delete login.PASSWORD;
    delete login.UPDATED_DATE;
    return { auth_token, login, is_login: false };
}



async function customLoginService(data: User) {
    const { USER_NAME, PASSWORD } = data;
    let login = await getBy({ USER_NAME });
    if (!login) {
        throw new StandardError(
            ErrorCodes.API_VALIDATION_ERROR,
            "This Username is not found Please Register."
        );
    }
    if (login.PASSWORD !== PASSWORD) {
        throw new StandardError(
            ErrorCodes.API_VALIDATION_ERROR,
            "Please Enter Valid Password."
        );
    }
    let auth_token = await signAccessToken(login);
    delete login.DELETED_DATE;
    delete login.PASSWORD;
    delete login.UPDATED_DATE;
    return { auth_token, login, is_login: true };
}


async function mobileService(data: User) {
    data.MOBILE_NO = data.MOBILE_NO.replace(/[\s\-\(\)]/g, '');
    const { MOBILE_NO } = data;
    let login = await getBy({ MOBILE_NO });
    if (!login) {
        throw new StandardError(
            ErrorCodes.API_VALIDATION_ERROR,
            "Your number is not registered to any account."
        );
    }
    // Pending OTP Send 
    // await sendSms({ mobile: MOBILE_NO });
    return { is_send_otp: true };
}


async function verifyMobileOtpService(data: any) {
    data.MOBILE_NO = data.MOBILE_NO.replace(/[\s\-\(\)]/g, '');
    const { MOBILE_NO, OTP } = data;
    let login = await getBy({ MOBILE_NO });
    if (!login) {
        throw new StandardError(
            ErrorCodes.API_VALIDATION_ERROR,
            "Your number is not registered to any account."
        );
    }

    // Pending Verification OTP
    if (OTP !== "123456") {
        throw new StandardError(
            ErrorCodes.API_VALIDATION_ERROR,
            "Your OTP is not valid."
        );
    }

    let auth_token = await signAccessToken(login);
    delete login.DELETED_DATE;
    delete login.PASSWORD;
    delete login.UPDATED_DATE;
    return { auth_token, login, is_login: true };
}


async function emailService(data: User) {
    const { EMAIL } = data;
    let login = await getBy({ EMAIL });
    if (!login) {
        throw new StandardError(
            ErrorCodes.API_VALIDATION_ERROR,
            "Your email is not registered to any account."
        );
    }
    // Pending OTP Send 
    // await sendEmailUsingSES('otp', { email: EMAIL, otp: otp });
    return { is_send_otp: true };
}

async function verifyEmailOtpService(data: any) {
    const { EMAIL, OTP } = data;
    let login = await getBy({ EMAIL });
    if (!login) {
        throw new StandardError(
            ErrorCodes.API_VALIDATION_ERROR,
            "Your email is not registered to any account."
        );
    }

    // Pending Verification OTP
    if (OTP !== "123456") {
        throw new StandardError(
            ErrorCodes.API_VALIDATION_ERROR,
            "Your OTP is not valid."
        );
    }

    let auth_token = await signAccessToken(login);
    delete login.DELETED_DATE;
    delete login.PASSWORD;
    delete login.UPDATED_DATE;
    return { auth_token, login, is_login: true };
}

async function resetPassword_mobileService(data: User) {
    data.MOBILE_NO = data.MOBILE_NO.replace(/[\s\-\(\)]/g, '');
    const { MOBILE_NO } = data;
    let login = await getBy({ MOBILE_NO });
    if (!login) {
        throw new StandardError(
            ErrorCodes.API_VALIDATION_ERROR,
            "Your number is not registered to any account."
        );
    }
    // Pending OTP Send 
    // await sendSms({ mobile: MOBILE_NO });
    return { is_send_otp: true };
}


async function verifyOtp_resetPassword_mobileService(data: any) {
    data.MOBILE_NO = data.MOBILE_NO.replace(/[\s\-\(\)]/g, '');
    const { MOBILE_NO, OTP } = data;
    let login = await getBy({ MOBILE_NO });
    if (!login) {
        throw new StandardError(
            ErrorCodes.API_VALIDATION_ERROR,
            "Your number is not registered to any account."
        );
    }

    // Pending Verification OTP
    if (OTP !== "123456") {
        throw new StandardError(
            ErrorCodes.API_VALIDATION_ERROR,
            "Your OTP is not valid."
        );
    }

    return { is_reset: true };
}

async function resetPassword(type: string, data: User) {
    if (type === "mobile") {
        data.MOBILE_NO = data.MOBILE_NO.replace(/[\s\-\(\)]/g, '');
        const { MOBILE_NO, PASSWORD } = data;
        let getUser = await getBy({ MOBILE_NO });
        if (!getUser) {
            throw new StandardError(
                ErrorCodes.API_VALIDATION_ERROR,
                "Your number is not registered to any account."
            );
        }
        let reset = {
            ...getUser,
            PASSWORD
        } as User;
        let update = await updateById(getUser.ID, reset);
        console.log(update);
        return { is_reset_password: true };
    }

    if (type === "email") {
        const { EMAIL, PASSWORD } = data;
        let getUser = await getBy({ EMAIL });
        if (!getUser) {
            throw new StandardError(
                ErrorCodes.API_VALIDATION_ERROR,
                "Your email is not registered to any account."
            );
        }
        let reset = {
            ...getUser,
            PASSWORD
        } as User;
        let update = await updateById(getUser.ID, reset);
        console.log(update);
        return { is_reset_password: true };
    }

    return { is_reset_password: false };
}


async function resetPassword_emailService(data: User) {
    const { EMAIL } = data;
    let login = await getBy({ EMAIL });
    if (!login) {
        throw new StandardError(
            ErrorCodes.API_VALIDATION_ERROR,
            "Your email is not registered to any account."
        );
    }
    // Pending OTP Send 
    // await sendEmailUsingSES('otp', { email: EMAIL, otp: otp });
    return { is_send_otp: true };
}

async function verifyOtp_resetPassword_emailService(data: any) {
    const { EMAIL, OTP } = data;
    let login = await getBy({ EMAIL });
    if (!login) {
        throw new StandardError(
            ErrorCodes.API_VALIDATION_ERROR,
            "Your email is not registered to any account."
        );
    }

    // Pending Verification OTP
    if (OTP !== "123456") {
        throw new StandardError(
            ErrorCodes.API_VALIDATION_ERROR,
            "Your OTP is not valid."
        );
    }

    return { is_reset: true };
}


async function guestRegisterService(data: User) {
    const { USER_NAME } = data;
    if (!!USER_NAME) {
        let login = await getBy({ USER_NAME });
        let auth_token = await signAccessToken(login);
        delete login.DELETED_DATE;
        delete login.PASSWORD;
        delete login.UPDATED_DATE;
        return { auth_token, login, is_login: true };
    } else {
        const user = new User();
        user.TYPE = UserType.GUEST; // Set the user type as GUEST
        let login = await user.save();
        let auth_token = await signAccessToken(login);
        delete login.DELETED_DATE;
        delete login.PASSWORD;
        delete login.UPDATED_DATE;
        return { auth_token, login, is_login: false };
    }
}


async function avatarFBProfileService(primaryID: string, data: User) {
    let getUser = await getBy({ ID: primaryID });
    if (!getUser) {
        throw new StandardError(
            ErrorCodes.API_VALIDATION_ERROR,
            "You  not registered to any account."
        );
    }
    let reset = {
        ...getUser,
        AVATAR: data?.AVATAR,
        FB_PROFILE: data?.FB_PROFILE
    } as User;
    let update = await updateById(getUser.ID, reset);
    console.log(update);
    return { is_update: true };
}


async function frameUpdateService(primaryID: string, data: User) {
    let getUser = await getBy({ ID: primaryID });
    if (!getUser) {
        throw new StandardError(
            ErrorCodes.API_VALIDATION_ERROR,
            "You  not registered to any account."
        );
    }
    let reset = {
        ...getUser,
        FRAME: data?.AVATAR
    } as User;
    let update = await updateById(getUser.ID, reset);
    console.log(update);
    return { is_update: true };
}


async function usernameCountryUpdateService(primaryID: string, data: User) {
    let getUser = await getBy({ ID: primaryID });
    if (!getUser) {
        throw new StandardError(
            ErrorCodes.API_VALIDATION_ERROR,
            "You  not registered to any account."
        );
    }
    if (getUser.USER_NAME !== data.USER_NAME) {
        const isAvailable = await countUsername(data.USER_NAME);
        if (isAvailable) {
            throw new StandardError(
                ErrorCodes.API_VALIDATION_ERROR,
                "Username is unavailable ."
            );
        }
    }
    let reset = {
        ...getUser,
        COUNTRY_CODE: data?.COUNTRY_CODE,
        USER_NAME: data?.USER_NAME
    } as User;
    let update = await updateById(getUser.ID, reset);
    console.log(update);
    return { is_update: true };
}



async function passwordUpdateService(primaryID: string, data: any) {
    if (data.NEW_PASSWORD !== data.CONFIRM_NEW_PASSWORD) {
        throw new StandardError(
            ErrorCodes.API_VALIDATION_ERROR,
            "New Password and Confirm Password must be equal."
        );
    }
    let getUser = await getBy({ ID: primaryID });
    if (!getUser) {
        throw new StandardError(
            ErrorCodes.API_VALIDATION_ERROR,
            "You have not registered to any account."
        );
    }
    if (!!getUser.PASSWORD) {
        if (getUser.PASSWORD === data.NEW_PASSWORD) {
            throw new StandardError(
                ErrorCodes.API_VALIDATION_ERROR,
                "New Password must be diffrent current password."
            );
        }
        if (getUser.PASSWORD !== data.OLD_PASSWORD) {
            throw new StandardError(
                ErrorCodes.API_VALIDATION_ERROR,
                "Please Enter Valid Current Password."
            );
        }
    }
    let reset = {
        ...getUser,
        PASSWORD: data?.NEW_PASSWORD
    } as User;
    let update = await updateById(getUser.ID, reset);
    console.log(update);
    return { is_update: true };
}


async function languageUpdateService(primaryID: string, data: User) {
    let getUser = await getBy({ ID: primaryID });
    if (!getUser) {
        throw new StandardError(
            ErrorCodes.API_VALIDATION_ERROR,
            "You have not registered to any account."
        );
    }
    let reset = {
        ...getUser,
        LANGUAGE: data?.LANGUAGE
    } as User;
    let update = await updateById(getUser.ID, reset);
    console.log(update);
    return { is_update: true };
}


async function settingUpdateService(primaryID: string, data: User) {
    let getUser = await getBy({ ID: primaryID });
    if (!getUser) {
        throw new StandardError(
            ErrorCodes.API_VALIDATION_ERROR,
            "You have not registered to any account."
        );
    }
    let reset = {
        ...getUser,
        ...data
    } as User;
    let update = await updateById(getUser.ID, reset);
    console.log(update);
    return { is_update: true };
}

async function userProfileService(primaryID: string) {
    let user = await getBy({ ID: primaryID });
    if (!user) {
        throw new StandardError(
            ErrorCodes.API_VALIDATION_ERROR,
            "You not registered to any account."
        );
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


async function getMutipleUserService(data: any) {
    let getIds = data.USER_IDS.toString().split(",");
    let users = await multipleById(getIds);
    if (!users) {
        throw new StandardError(
            ErrorCodes.API_VALIDATION_ERROR,
            "You not get user inforation."
        );
    }
    return { users };
}


async function serachInvitedUserClubService(data: any) {
    let users = await clubUserSearchById(data);
    if (!users) {
        throw new StandardError(
            ErrorCodes.API_VALIDATION_ERROR,
            "You not get user inforation."
        );
    }
    return { users };
}


async function searchUserNameAndIdService(data: any) {
    let users = await clubUserSearchById(data);
    if (!users) {
        throw new StandardError(
            ErrorCodes.API_VALIDATION_ERROR,
            "You not get user inforation."
        );
    }
    return { searchuser: users };
}

async function paginationUserService(data: any): Promise<{ listOfUser: User[], total: number }> {
    const query = {
        order: {
            CREATED_DATE: "DESC"
        },
        take: data.take,
        skip: (data.page - 1) * data.take,
        where: [
            { USER_NAME: Like('%' + data.search + '%') },
            { MOBILE_NO: Like('%' + data.search + '%') },
            { EMAIL: Like('%' + data.search + '%') }
        ],
        select: ['ID', 'AVATAR', 'EMAIL', 'MOBILE_NO', 'USER_NAME', 'ONLINE']
    };
    // console.log(JSON.stringify(query))
    const list = await paginateList(query) as any;
    return { listOfUser: list?.[0], total: list?.[1] };
}


async function guestUserTransferService(userId: string, data: User) {
    const {
        TYPE
    } = data;
    if (!(["Facebook", "Gmail", "Apple"].includes(TYPE))) {
        throw new StandardError(
            ErrorCodes.API_VALIDATION_ERROR,
            "Please Verify Login Type."
        );
    }
    if (!!data.MOBILE_NO) {
        delete data.MOBILE_NO;
    }
    const { USER_ID } = data;
    let login = await getBy({ USER_ID, TYPE });
    if (!!login) {
        // Throw Error
        throw new StandardError(
            ErrorCodes.API_VALIDATION_ERROR,
            `You are aleardy register ${TYPE} account.`
        );
    }
    let reset = {
        ...data,
        USER_NAME: data.USER_ID
    } as User;
    let update = await updateById(userId, reset);
    return { isTransfer: Boolean(update?.affected) ?? false };
}



export {
    socialLoginService, customRegisterService, customLoginService, mobileService, verifyMobileOtpService, emailService, verifyEmailOtpService,
    resetPassword_mobileService, verifyOtp_resetPassword_mobileService,
    resetPassword_emailService, verifyOtp_resetPassword_emailService,
    resetPassword, guestRegisterService,

    avatarFBProfileService, frameUpdateService,
    usernameCountryUpdateService, settingUpdateService,
    passwordUpdateService, languageUpdateService,

    paginationUserService,

    userProfileService, getMutipleUserService, guestUserTransferService,
    serachInvitedUserClubService, searchUserNameAndIdService
};



