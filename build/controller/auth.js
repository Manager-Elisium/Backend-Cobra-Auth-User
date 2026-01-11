"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.socialLogin = socialLogin;
exports.customRegister = customRegister;
exports.customLogin = customLogin;
exports.sendOtp_mobileLogin = sendOtp_mobileLogin;
exports.verifyOtp_mobileLogin = verifyOtp_mobileLogin;
exports.sendOtp_emailLogin = sendOtp_emailLogin;
exports.verifyOtp_emailLogin = verifyOtp_emailLogin;
exports.sendOtp_mobileResetPassword = sendOtp_mobileResetPassword;
exports.verifyOtp_mobileResetPassword = verifyOtp_mobileResetPassword;
exports.mobileResetPassword = mobileResetPassword;
exports.sendOtp_emailResetPassword = sendOtp_emailResetPassword;
exports.verifyOtp_emailResetPassword = verifyOtp_emailResetPassword;
exports.emailResetPassword = emailResetPassword;
exports.guestRegister = guestRegister;
exports.userProfile = userProfile;
exports.userDetails = userDetails;
exports.avatarFbProfile = avatarFbProfile;
exports.frameUpdate = frameUpdate;
exports.usernameCountryUpdate = usernameCountryUpdate;
exports.passwordUpdate = passwordUpdate;
exports.languageUpdate = languageUpdate;
exports.settingUpdate = settingUpdate;
exports.guestUserTransfer = guestUserTransfer;
exports.paginateUserDetail = paginateUserDetail;
exports.getUserProfile = getUserProfile;
const auth_service_1 = require("../services/auth.service");
const encrypt_1 = require("src/common/encrypt");
const encrypt_admin_1 = require("src/common/encrypt-admin");
const secretKeyAdmin = 'SWS0zf0thg8T5Gz3scOSQ2W4r6r7GJAg';
async function socialLogin(req, res, next) {
    try {
        let request = await (0, encrypt_1.decrypt)(req.body);
        let { auth_token, login, is_login } = await (0, auth_service_1.socialLoginService)(JSON.parse(request));
        return res.send(await (0, encrypt_1.encrypt)(JSON.stringify({ status: true, message: is_login ? "Login" : "Register", auth_token, login, is_login })));
        // return res.json({ status: true, data: await encrypt(JSON.stringify(auth)) });
    }
    catch (error) {
        let message = error?.message ?? "";
        return res.json(await (0, encrypt_1.encrypt)(JSON.stringify({ status: false, message: message })));
    }
}
async function customRegister(req, res, next) {
    try {
        let request = await (0, encrypt_1.decrypt)(req.body);
        let { auth_token, login, is_login } = await (0, auth_service_1.customRegisterService)(JSON.parse(request));
        // const data = {
        //     auth_token, login, is_login
        // }
        // return res.json({ status: true, data: await encrypt(JSON.stringify(auth)) });
        return res.send(await (0, encrypt_1.encrypt)(JSON.stringify({ status: true, message: "Register", auth_token, login, is_login })));
    }
    catch (error) {
        let message = error?.message ?? "";
        return res.json(await (0, encrypt_1.encrypt)(JSON.stringify({ status: false, message: message })));
    }
}
async function customLogin(req, res, next) {
    try {
        let request = await (0, encrypt_1.decrypt)(req.body);
        let { auth_token, login, is_login } = await (0, auth_service_1.customLoginService)(JSON.parse(request));
        // const data = {
        //     auth_token, login, is_login
        // }
        // return res.json({ status: true, data: await encrypt(JSON.stringify(auth)) });
        return res.send(await (0, encrypt_1.encrypt)(JSON.stringify({ status: true, message: "Login", auth_token, login, is_login })));
    }
    catch (error) {
        let message = error?.message ?? "";
        return res.json(await (0, encrypt_1.encrypt)(JSON.stringify({ status: false, message: message })));
    }
}
async function sendOtp_mobileLogin(req, res, next) {
    try {
        let request = await (0, encrypt_1.decrypt)(req.body);
        let { is_send_otp } = await (0, auth_service_1.mobileService)(JSON.parse(request));
        // const data = {
        //     is_send_otp
        // }
        // return res.json({ status: true, data: await encrypt(JSON.stringify(auth)) });
        return res.send(await (0, encrypt_1.encrypt)(JSON.stringify({ status: true, message: "Send Otp in Mobile", is_send_otp })));
    }
    catch (error) {
        let message = error?.message ?? "";
        return res.json(await (0, encrypt_1.encrypt)(JSON.stringify({ status: false, message: message })));
    }
}
async function verifyOtp_mobileLogin(req, res, next) {
    try {
        let request = await (0, encrypt_1.decrypt)(req.body);
        let { auth_token, login, is_login } = await (0, auth_service_1.verifyMobileOtpService)(JSON.parse(request));
        // const data = {
        //     auth_token, login, is_login
        // }
        return res.send(await (0, encrypt_1.encrypt)(JSON.stringify({ status: true, message: "Login", auth_token, login, is_login })));
        // return res.json({ status: true, data: await encrypt(JSON.stringify(auth)) });
    }
    catch (error) {
        let message = error?.message ?? "";
        return res.json(await (0, encrypt_1.encrypt)(JSON.stringify({ status: false, message: message })));
    }
}
async function sendOtp_emailLogin(req, res, next) {
    try {
        let request = await (0, encrypt_1.decrypt)(req.body);
        let { is_send_otp } = await (0, auth_service_1.emailService)(JSON.parse(request));
        // const data = {
        //     is_send_otp
        // }
        return res.send(await (0, encrypt_1.encrypt)(JSON.stringify({ status: true, message: "Send Otp in Email", is_send_otp })));
        // return res.json({ status: true, data: await encrypt(JSON.stringify(auth)) });
    }
    catch (error) {
        let message = error?.message ?? "";
        return res.json(await (0, encrypt_1.encrypt)(JSON.stringify({ status: false, message: message })));
    }
}
async function verifyOtp_emailLogin(req, res, next) {
    try {
        let request = await (0, encrypt_1.decrypt)(req.body);
        let { auth_token, login, is_login } = await (0, auth_service_1.verifyEmailOtpService)(JSON.parse(request));
        // const data = {
        //     auth_token, login, is_login
        // }
        return res.send(await (0, encrypt_1.encrypt)(JSON.stringify({ status: true, message: "Login", auth_token, login, is_login })));
        // return res.json({ status: true, data: await encrypt(JSON.stringify(auth)) });
    }
    catch (error) {
        let message = error?.message ?? "";
        return res.json(await (0, encrypt_1.encrypt)(JSON.stringify({ status: false, message: message })));
    }
}
async function sendOtp_mobileResetPassword(req, res, next) {
    try {
        let request = await (0, encrypt_1.decrypt)(req.body);
        let { is_send_otp } = await (0, auth_service_1.resetPassword_mobileService)(JSON.parse(request));
        // const data = {
        //     is_send_otp
        // }
        return res.send(await (0, encrypt_1.encrypt)(JSON.stringify({ status: true, message: "Send Otp - Mobile", is_send_otp })));
        // return res.json({ status: true, data: await encrypt(JSON.stringify(auth)) });
    }
    catch (error) {
        let message = error?.message ?? "";
        return res.json(await (0, encrypt_1.encrypt)(JSON.stringify({ status: false, message: message })));
    }
}
async function verifyOtp_mobileResetPassword(req, res, next) {
    try {
        let request = await (0, encrypt_1.decrypt)(req.body);
        let { is_reset } = await (0, auth_service_1.verifyOtp_resetPassword_mobileService)(JSON.parse(request));
        // const data = {
        //     is_reset
        // }
        return res.send(await (0, encrypt_1.encrypt)(JSON.stringify({ status: true, message: "Verify Otp - Mobile", is_reset })));
        // return res.json({ status: true, data: await encrypt(JSON.stringify(auth)) });
    }
    catch (error) {
        let message = error?.message ?? "";
        return res.json(await (0, encrypt_1.encrypt)(JSON.stringify({ status: false, message: message })));
    }
}
async function mobileResetPassword(req, res, next) {
    try {
        let request = await (0, encrypt_1.decrypt)(req.body);
        let { is_reset_password } = await (0, auth_service_1.resetPassword)('mobile', JSON.parse(request));
        // const data = {
        //     is_reset_password
        // }
        return res.send(await (0, encrypt_1.encrypt)(JSON.stringify({ status: true, message: "Reset Password", is_reset_password })));
        // return res.json({ status: true, data: await encrypt(JSON.stringify(auth)) });
    }
    catch (error) {
        let message = error?.message ?? "";
        return res.json(await (0, encrypt_1.encrypt)(JSON.stringify({ status: false, message: message })));
    }
}
async function sendOtp_emailResetPassword(req, res, next) {
    try {
        let request = await (0, encrypt_1.decrypt)(req.body);
        let { is_send_otp } = await (0, auth_service_1.resetPassword_emailService)(JSON.parse(request));
        // const data = {
        //     is_send_otp
        // }
        return res.send(await (0, encrypt_1.encrypt)(JSON.stringify({ status: true, message: "Send Otp - Email", is_send_otp })));
    }
    catch (error) {
        let message = error?.message ?? "";
        return res.json(await (0, encrypt_1.encrypt)(JSON.stringify({ status: false, message: message })));
    }
}
async function verifyOtp_emailResetPassword(req, res, next) {
    try {
        let request = await (0, encrypt_1.decrypt)(req.body);
        let { is_reset } = await (0, auth_service_1.verifyOtp_resetPassword_emailService)(JSON.parse(request));
        // const data = {
        //     is_reset
        // }
        return res.send(await (0, encrypt_1.encrypt)(JSON.stringify({ status: true, message: "Verify Otp - Email", is_reset })));
        // return res.json({ status: true, data: await encrypt(JSON.stringify(auth)) });
    }
    catch (error) {
        let message = error?.message ?? "";
        return res.json(await (0, encrypt_1.encrypt)(JSON.stringify({ status: false, message: message })));
    }
}
async function emailResetPassword(req, res, next) {
    try {
        let request = await (0, encrypt_1.decrypt)(req.body);
        let { is_reset_password } = await (0, auth_service_1.resetPassword)('email', JSON.parse(request));
        // const data = {
        //     is_reset_password
        // }
        return res.send(await (0, encrypt_1.encrypt)(JSON.stringify({ status: true, message: "Reset Password - Email", is_reset_password })));
        // return res.json({ status: true, data: await encrypt(JSON.stringify(auth)) });
    }
    catch (error) {
        let message = error?.message ?? "";
        return res.json(await (0, encrypt_1.encrypt)(JSON.stringify({ status: false, message: message })));
    }
}
async function guestRegister(req, res, next) {
    try {
        let request = await (0, encrypt_1.decrypt)(req.body);
        let { auth_token, is_login, login } = await (0, auth_service_1.guestRegisterService)(JSON.parse(request));
        // const data = {
        //     auth_token, login, is_login
        // }
        return res.send(await (0, encrypt_1.encrypt)(JSON.stringify({ status: true, message: "Guest Register", auth_token, login, is_login })));
        // return res.json({ status: true, data: await encrypt(JSON.stringify(auth)) });
    }
    catch (error) {
        let message = error?.message ?? "";
        return res.json(await (0, encrypt_1.encrypt)(JSON.stringify({ status: false, message: message })));
    }
}
async function avatarFbProfile(req, res, next) {
    try {
        const { public_key, content, token } = req.body;
        let request = await (0, encrypt_1.decrypt)({ public_key, content });
        let updateAvatar = await (0, auth_service_1.avatarFBProfileService)(token.ID, JSON.parse(request));
        return res.send(await (0, encrypt_1.encrypt)(JSON.stringify({ status: true, message: "Update avatar", updateAvatar })));
        // return res.json({ status: true, data: await encrypt(JSON.stringify(auth)) });
    }
    catch (error) {
        let message = error?.message ?? "";
        return res.json(await (0, encrypt_1.encrypt)(JSON.stringify({ status: false, message })));
    }
}
async function frameUpdate(req, res, next) {
    try {
        const { public_key, content, token } = req.body;
        let request = await (0, encrypt_1.decrypt)({ public_key, content });
        let updateFrame = await (0, auth_service_1.frameUpdateService)(token.ID, JSON.parse(request));
        return res.send(await (0, encrypt_1.encrypt)(JSON.stringify({ status: true, message: "Update frame", updateFrame })));
        // return res.json({ status: true, data: await encrypt(JSON.stringify(auth)) });
    }
    catch (error) {
        let message = error?.message ?? "";
        return res.json(await (0, encrypt_1.encrypt)(JSON.stringify({ status: false, message })));
    }
}
async function usernameCountryUpdate(req, res, next) {
    try {
        const { public_key, content, token } = req.body;
        let request = await (0, encrypt_1.decrypt)({ public_key, content });
        let updateUsernameCountry = await (0, auth_service_1.usernameCountryUpdateService)(token.ID, JSON.parse(request));
        return res.send(await (0, encrypt_1.encrypt)(JSON.stringify({ status: true, message: "Update User Name / Country", updateUsernameCountry })));
        // return res.json({ status: true, data: await encrypt(JSON.stringify(auth)) });
    }
    catch (error) {
        let message = error?.message ?? "";
        return res.json(await (0, encrypt_1.encrypt)(JSON.stringify({ status: false, message })));
    }
}
async function passwordUpdate(req, res, next) {
    try {
        const { public_key, content, token } = req.body;
        let request = await (0, encrypt_1.decrypt)({ public_key, content });
        let updatePassword = await (0, auth_service_1.passwordUpdateService)(token.ID, JSON.parse(request));
        return res.send(await (0, encrypt_1.encrypt)(JSON.stringify({ status: true, message: "Update Password", updatePassword })));
        // return res.json({ status: true, data: await encrypt(JSON.stringify(updatePassword)) });
    }
    catch (error) {
        let message = error?.message ?? "";
        return res.json(await (0, encrypt_1.encrypt)(JSON.stringify({ status: false, message })));
    }
}
async function languageUpdate(req, res, next) {
    try {
        const { public_key, content, token } = req.body;
        let request = await (0, encrypt_1.decrypt)({ public_key, content });
        let updateLanguage = await (0, auth_service_1.languageUpdateService)(token.ID, JSON.parse(request));
        return res.send(await (0, encrypt_1.encrypt)(JSON.stringify({ status: true, message: "Update Language", updateLanguage })));
        // return res.json({ status: true, data: await encrypt(JSON.stringify(updateLanguage)) });
    }
    catch (error) {
        let message = error?.message ?? "";
        return res.json(await (0, encrypt_1.encrypt)(JSON.stringify({ status: false, message })));
    }
}
async function settingUpdate(req, res, next) {
    try {
        const { public_key, content, token } = req.body;
        let request = await (0, encrypt_1.decrypt)({ public_key, content });
        let updateSetting = await (0, auth_service_1.settingUpdateService)(token.ID, JSON.parse(request));
        return res.send(await (0, encrypt_1.encrypt)(JSON.stringify({ status: true, message: "Update Setting", updateSetting })));
        // return res.json({ status: true, data: await encrypt(JSON.stringify(updateSetting)) });
    }
    catch (error) {
        let message = error?.message ?? "";
        return res.json(await (0, encrypt_1.encrypt)(JSON.stringify({ status: false, message: message })));
    }
}
async function userProfile(req, res, next) {
    try {
        const { token } = req.body;
        let { user } = await (0, auth_service_1.userProfileService)(token.ID);
        return res.send(await (0, encrypt_1.encrypt)(JSON.stringify({ status: true, message: "User Profile", user })));
        // return res.json({ status: true, data: await encrypt(JSON.stringify(auth)) });
    }
    catch (error) {
        let message = error?.message ?? "";
        return res.json(await (0, encrypt_1.encrypt)(JSON.stringify({ status: false, message: message })));
    }
}
async function userDetails(req, res, next) {
    try {
        const { public_key, content, token } = req.body;
        let request = await (0, encrypt_1.decrypt)({ public_key, content });
        let { users } = await (0, auth_service_1.getMutipleUserService)(JSON.parse(request));
        return res.send(await (0, encrypt_1.encrypt)(JSON.stringify({ status: true, message: "User Profile", users })));
        // return res.json({ status: true, data: await encrypt(JSON.stringify(mutipleUsers)) });
    }
    catch (error) {
        let message = error?.message ?? "";
        return res.json(await (0, encrypt_1.encrypt)(JSON.stringify({ status: false, message: message })));
    }
}
async function guestUserTransfer(req, res, next) {
    try {
        const { public_key, content, token } = req.body;
        let request = await (0, encrypt_1.decrypt)({ public_key, content });
        let { isTransfer } = await (0, auth_service_1.guestUserTransferService)(token.ID, JSON.parse(request));
        return res.send(await (0, encrypt_1.encrypt)(JSON.stringify({ status: true, message: "Guest User Transfer", isTransfer })));
    }
    catch (error) {
        let message = error?.message ?? "";
        return res.json(await (0, encrypt_1.encrypt)(JSON.stringify({ status: false, message })));
    }
}
async function paginateUserDetail(req, res, next) {
    try {
        const { take, page, search } = req.query;
        let data = await (0, auth_service_1.paginationUserService)({
            take: take || 5,
            page: page || 1,
            search: search || ""
        });
        let encryptedData = await (0, encrypt_admin_1.encryptRestApi)(JSON.stringify(data), secretKeyAdmin);
        return res.json({ status: true, message: "List User Detail", data: encryptedData });
    }
    catch (error) {
        return res.json({ status: false, message: error?.message ?? "" });
    }
}
async function getUserProfile(req, res, next) {
    try {
        const { userId } = req.query;
        const requestBody = userId.toString() ?? "";
        let { user: userProfile } = await (0, auth_service_1.userProfileService)(requestBody);
        let encryptedData = await (0, encrypt_admin_1.encryptRestApi)(JSON.stringify({ userProfile }), secretKeyAdmin);
        return res.json({ status: true, data: encryptedData });
    }
    catch (error) {
        let message = error?.message ?? "";
        return res.json({ status: false, message });
    }
}
