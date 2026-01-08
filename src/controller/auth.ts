import { Response, Request, NextFunction } from "express";
import { avatarFBProfileService, customLoginService, customRegisterService, emailService, frameUpdateService, getMutipleUserService, guestRegisterService, guestUserTransferService, languageUpdateService, mobileService, paginationUserService, passwordUpdateService, resetPassword, resetPassword_emailService, resetPassword_mobileService, settingUpdateService, socialLoginService, userProfileService, usernameCountryUpdateService, verifyEmailOtpService, verifyMobileOtpService, verifyOtp_resetPassword_emailService, verifyOtp_resetPassword_mobileService } from "../services/auth.service";
import { encrypt, decrypt } from "src/common/encrypt";
import { encryptRestApi } from "src/common/encrypt-admin";
const secretKeyAdmin = 'SWS0zf0thg8T5Gz3scOSQ2W4r6r7GJAg';

async function socialLogin(req: Request, res: Response, next: NextFunction) {
    try {
        let request: any = await decrypt(req.body);
        let { auth_token, login, is_login } = await socialLoginService(JSON.parse(request));
        return res.send(await encrypt(JSON.stringify({ status: true, message: is_login ? "Login" : "Register", auth_token, login, is_login })));
        // return res.json({ status: true, data: await encrypt(JSON.stringify(auth)) });
    } catch (error) {
        let message = error?.message ?? "";
        return res.json(await encrypt(JSON.stringify({ status: false, message: message })));
    }
}


async function customRegister(req: Request, res: Response, next: NextFunction) {
    try {
        let request: any = await decrypt(req.body);
        let { auth_token, login, is_login } = await customRegisterService(JSON.parse(request));
        // const data = {
        //     auth_token, login, is_login
        // }
        // return res.json({ status: true, data: await encrypt(JSON.stringify(auth)) });
        return res.send(await encrypt(JSON.stringify({ status: true, message: "Register", auth_token, login, is_login })));
    } catch (error) {
        let message = error?.message ?? "";
        return res.json(await encrypt(JSON.stringify({ status: false, message: message })));
    }
}


async function customLogin(req: Request, res: Response, next: NextFunction) {
    try {
        let request: any = await decrypt(req.body);
        let { auth_token, login, is_login } = await customLoginService(JSON.parse(request));
        // const data = {
        //     auth_token, login, is_login
        // }
        // return res.json({ status: true, data: await encrypt(JSON.stringify(auth)) });
        return res.send(await encrypt(JSON.stringify({ status: true, message: "Login", auth_token, login, is_login })));
    } catch (error) {
        let message = error?.message ?? "";
        return res.json(await encrypt(JSON.stringify({ status: false, message: message })));
    }
}


async function sendOtp_mobileLogin(req: Request, res: Response, next: NextFunction) {
    try {
        let request: any = await decrypt(req.body);
        let { is_send_otp } = await mobileService(JSON.parse(request));
        // const data = {
        //     is_send_otp
        // }
        // return res.json({ status: true, data: await encrypt(JSON.stringify(auth)) });
        return res.send(await encrypt(JSON.stringify({ status: true, message: "Send Otp in Mobile", is_send_otp })));
    } catch (error) {
        let message = error?.message ?? "";
        return res.json(await encrypt(JSON.stringify({ status: false, message: message })));
    }
}


async function verifyOtp_mobileLogin(req: Request, res: Response, next: NextFunction) {
    try {
        let request: any = await decrypt(req.body);
        let { auth_token, login, is_login } = await verifyMobileOtpService(JSON.parse(request));
        // const data = {
        //     auth_token, login, is_login
        // }
        return res.send(await encrypt(JSON.stringify({ status: true, message: "Login", auth_token, login, is_login })));
        // return res.json({ status: true, data: await encrypt(JSON.stringify(auth)) });
    } catch (error) {
        let message = error?.message ?? "";
        return res.json(await encrypt(JSON.stringify({ status: false, message: message })));
    }
}


async function sendOtp_emailLogin(req: Request, res: Response, next: NextFunction) {
    try {
        let request: any = await decrypt(req.body);
        let { is_send_otp } = await emailService(JSON.parse(request));
        // const data = {
        //     is_send_otp
        // }
        return res.send(await encrypt(JSON.stringify({ status: true, message: "Send Otp in Email", is_send_otp })));
        // return res.json({ status: true, data: await encrypt(JSON.stringify(auth)) });
    } catch (error) {
        let message = error?.message ?? "";
        return res.json(await encrypt(JSON.stringify({ status: false, message: message })));
    }
}


async function verifyOtp_emailLogin(req: Request, res: Response, next: NextFunction) {
    try {
        let request: any = await decrypt(req.body);
        let { auth_token, login, is_login } = await verifyEmailOtpService(JSON.parse(request));
        // const data = {
        //     auth_token, login, is_login
        // }

        return res.send(await encrypt(JSON.stringify({ status: true, message: "Login", auth_token, login, is_login })));
        // return res.json({ status: true, data: await encrypt(JSON.stringify(auth)) });
    } catch (error) {
        let message = error?.message ?? "";
        return res.json(await encrypt(JSON.stringify({ status: false, message: message })));
    }
}


async function sendOtp_mobileResetPassword(req: Request, res: Response, next: NextFunction) {
    try {
        let request: any = await decrypt(req.body);
        let { is_send_otp } = await resetPassword_mobileService(JSON.parse(request));
        // const data = {
        //     is_send_otp
        // }
        return res.send(await encrypt(JSON.stringify({ status: true, message: "Send Otp - Mobile", is_send_otp })));
        // return res.json({ status: true, data: await encrypt(JSON.stringify(auth)) });
    } catch (error) {
        let message = error?.message ?? "";
        return res.json(await encrypt(JSON.stringify({ status: false, message: message })));
    }
}


async function verifyOtp_mobileResetPassword(req: Request, res: Response, next: NextFunction) {
    try {
        let request: any = await decrypt(req.body);
        let { is_reset } = await verifyOtp_resetPassword_mobileService(JSON.parse(request));
        // const data = {
        //     is_reset
        // }
        return res.send(await encrypt(JSON.stringify({ status: true, message: "Verify Otp - Mobile", is_reset })));
        // return res.json({ status: true, data: await encrypt(JSON.stringify(auth)) });
    } catch (error) {
        let message = error?.message ?? "";
        return res.json(await encrypt(JSON.stringify({ status: false, message: message })));
    }
}


async function mobileResetPassword(req: Request, res: Response, next: NextFunction) {
    try {
        let request: any = await decrypt(req.body);
        let { is_reset_password } = await resetPassword('mobile', JSON.parse(request));
        // const data = {
        //     is_reset_password
        // }
        return res.send(await encrypt(JSON.stringify({ status: true, message: "Reset Password", is_reset_password })));
        // return res.json({ status: true, data: await encrypt(JSON.stringify(auth)) });
    } catch (error) {
        let message = error?.message ?? "";
        return res.json(await encrypt(JSON.stringify({ status: false, message: message })));
    }
}


async function sendOtp_emailResetPassword(req: Request, res: Response, next: NextFunction) {
    try {
        let request: any = await decrypt(req.body);
        let { is_send_otp } = await resetPassword_emailService(JSON.parse(request));
        // const data = {
        //     is_send_otp
        // }
        return res.send(await encrypt(JSON.stringify({ status: true, message: "Send Otp - Email", is_send_otp })));
    } catch (error) {
        let message = error?.message ?? "";
        return res.json(await encrypt(JSON.stringify({ status: false, message: message })));
    }
}


async function verifyOtp_emailResetPassword(req: Request, res: Response, next: NextFunction) {
    try {
        let request: any = await decrypt(req.body);
        let { is_reset } = await verifyOtp_resetPassword_emailService(JSON.parse(request));
        // const data = {
        //     is_reset
        // }
        return res.send(await encrypt(JSON.stringify({ status: true, message: "Verify Otp - Email", is_reset })));
        // return res.json({ status: true, data: await encrypt(JSON.stringify(auth)) });
    } catch (error) {
        let message = error?.message ?? "";
        return res.json(await encrypt(JSON.stringify({ status: false, message: message })));
    }
}

async function emailResetPassword(req: Request, res: Response, next: NextFunction) {
    try {
        let request: any = await decrypt(req.body);
        let { is_reset_password } = await resetPassword('email', JSON.parse(request));
        // const data = {
        //     is_reset_password
        // }
        return res.send(await encrypt(JSON.stringify({ status: true, message: "Reset Password - Email", is_reset_password })));
        // return res.json({ status: true, data: await encrypt(JSON.stringify(auth)) });
    } catch (error) {
        let message = error?.message ?? "";
        return res.json(await encrypt(JSON.stringify({ status: false, message: message })));
    }
}


async function guestRegister(req: Request, res: Response, next: NextFunction) {
    try {
        let request: any = await decrypt(req.body);
        let { auth_token, is_login, login } = await guestRegisterService(JSON.parse(request));
        // const data = {
        //     auth_token, login, is_login
        // }
        return res.send(await encrypt(JSON.stringify({ status: true, message: "Guest Register", auth_token, login, is_login })));
        // return res.json({ status: true, data: await encrypt(JSON.stringify(auth)) });
    } catch (error) {
        let message = error?.message ?? "";
        return res.json(await encrypt(JSON.stringify({ status: false, message: message })));
    }
}


async function avatarFbProfile(req: Request, res: Response, next: NextFunction) {
    try {
        const { public_key, content, token } = req.body;
        let request: any = await decrypt({ public_key, content });
        let updateAvatar = await avatarFBProfileService(token.ID, JSON.parse(request));
        return res.send(await encrypt(JSON.stringify({ status: true, message: "Update avatar", updateAvatar })));
        // return res.json({ status: true, data: await encrypt(JSON.stringify(auth)) });
    } catch (error) {
        let message = error?.message ?? "";
        return res.json(await encrypt(JSON.stringify({ status: false, message })));
    }
}


async function frameUpdate(req: Request, res: Response, next: NextFunction) {
    try {
        const { public_key, content, token } = req.body;
        let request: any = await decrypt({ public_key, content });
        let updateFrame = await frameUpdateService(token.ID, JSON.parse(request));
        return res.send(await encrypt(JSON.stringify({ status: true, message: "Update frame", updateFrame })));
        // return res.json({ status: true, data: await encrypt(JSON.stringify(auth)) });
    } catch (error) {
        let message = error?.message ?? "";
        return res.json(await encrypt(JSON.stringify({ status: false, message })));
    }
}


async function usernameCountryUpdate(req: Request, res: Response, next: NextFunction) {
    try {
        const { public_key, content, token } = req.body;
        let request: any = await decrypt({ public_key, content });
        let updateUsernameCountry = await usernameCountryUpdateService(token.ID, JSON.parse(request));
        return res.send(await encrypt(JSON.stringify({ status: true, message: "Update User Name / Country", updateUsernameCountry })));
        // return res.json({ status: true, data: await encrypt(JSON.stringify(auth)) });
    } catch (error) {
        let message = error?.message ?? "";
        return res.json(await encrypt(JSON.stringify({ status: false, message })));
    }
}


async function passwordUpdate(req: Request, res: Response, next: NextFunction) {
    try {
        const { public_key, content, token } = req.body;
        let request: any = await decrypt({ public_key, content });
        let updatePassword = await passwordUpdateService(token.ID, JSON.parse(request));
        return res.send(await encrypt(JSON.stringify({ status: true, message: "Update Password", updatePassword })));
        // return res.json({ status: true, data: await encrypt(JSON.stringify(updatePassword)) });
    } catch (error) {
        let message = error?.message ?? "";
        return res.json(await encrypt(JSON.stringify({ status: false, message })));
    }
}


async function languageUpdate(req: Request, res: Response, next: NextFunction) {
    try {
        const { public_key, content, token } = req.body;
        let request: any = await decrypt({ public_key, content });
        let updateLanguage = await languageUpdateService(token.ID, JSON.parse(request));
        return res.send(await encrypt(JSON.stringify({ status: true, message: "Update Language", updateLanguage })));
        // return res.json({ status: true, data: await encrypt(JSON.stringify(updateLanguage)) });
    } catch (error) {
        let message = error?.message ?? "";
        return res.json(await encrypt(JSON.stringify({ status: false, message })));
    }
}


async function settingUpdate(req: Request, res: Response, next: NextFunction) {
    try {
        const { public_key, content, token } = req.body;
        let request: any = await decrypt({ public_key, content });
        let updateSetting = await settingUpdateService(token.ID, JSON.parse(request));
        return res.send(await encrypt(JSON.stringify({ status: true, message: "Update Setting", updateSetting })));
        // return res.json({ status: true, data: await encrypt(JSON.stringify(updateSetting)) });
    } catch (error) {
        let message = error?.message ?? "";
        return res.json(await encrypt(JSON.stringify({ status: false, message: message })));
    }
}

async function userProfile(req: Request, res: Response, next: NextFunction) {
    try {
        const { token } = req.body;
        let { user } = await userProfileService(token.ID);
        return res.send(await encrypt(JSON.stringify({ status: true, message: "User Profile", user })));
        // return res.json({ status: true, data: await encrypt(JSON.stringify(auth)) });
    } catch (error) {
        let message = error?.message ?? "";
        return res.json(await encrypt(JSON.stringify({ status: false, message: message })));
    }
}


async function userDetails(req: Request, res: Response, next: NextFunction) {
    try {
        const { public_key, content, token } = req.body;
        let request: any = await decrypt({ public_key, content });
        let { users } = await getMutipleUserService(JSON.parse(request));
        return res.send(await encrypt(JSON.stringify({ status: true, message: "User Profile", users })));
        // return res.json({ status: true, data: await encrypt(JSON.stringify(mutipleUsers)) });
    } catch (error) {
        let message = error?.message ?? "";
        return res.json(await encrypt(JSON.stringify({ status: false, message: message })));
    }
}


async function guestUserTransfer(req: Request, res: Response, next: NextFunction) {
    try {
        const { public_key, content, token } = req.body;
        let request: any = await decrypt({ public_key, content });
        let { isTransfer } = await guestUserTransferService(token.ID, JSON.parse(request));
        return res.send(await encrypt(JSON.stringify({ status: true, message: "Guest User Transfer", isTransfer })));
    } catch (error) {
        let message = error?.message ?? "";
        return res.json(await encrypt(JSON.stringify({ status: false, message })));
    }
}



async function paginateUserDetail(req: Request, res: Response, next: NextFunction) {
    try {
        const { take, page, search } = req.query;
        let data = await paginationUserService({
            take: take || 5,
            page: page || 1,
            search: search || ""
        });
        let encryptedData = await encryptRestApi(JSON.stringify(data), secretKeyAdmin);
        return res.json({ status: true, message: "List User Detail", data: encryptedData });
    } catch (error) {
        return res.json({ status: false, message: error?.message ?? "" });
    }
}

async function getUserProfile(req: Request, res: Response, next: NextFunction) {
    try {
        const { userId } = req.query;
        const requestBody = userId.toString() ?? ""
        let { user: userProfile } = await userProfileService(requestBody);
        let encryptedData = await encryptRestApi(JSON.stringify({ userProfile }), secretKeyAdmin);
        return res.json({ status: true, data: encryptedData });
    } catch (error) {
        let message = error?.message ?? "";
        return res.json({ status: false, message });
    }
}

export {
    socialLogin, customRegister, customLogin,
    sendOtp_mobileLogin, verifyOtp_mobileLogin, sendOtp_emailLogin, verifyOtp_emailLogin,
    sendOtp_mobileResetPassword, verifyOtp_mobileResetPassword, mobileResetPassword,
    sendOtp_emailResetPassword, verifyOtp_emailResetPassword, emailResetPassword,
    guestRegister,

    userProfile, userDetails,

    avatarFbProfile, frameUpdate, usernameCountryUpdate, passwordUpdate, languageUpdate, settingUpdate,
    guestUserTransfer,

    paginateUserDetail, getUserProfile
};
