import express from "express";
let router = express.Router();
import { customRegister, socialLogin, customLogin, 
    sendOtp_mobileLogin, verifyOtp_mobileLogin, sendOtp_emailLogin, verifyOtp_emailLogin, 
    sendOtp_mobileResetPassword, verifyOtp_mobileResetPassword, mobileResetPassword, 
    emailResetPassword, sendOtp_emailResetPassword, verifyOtp_emailResetPassword, guestRegister, avatarFbProfile, userProfile, userDetails, frameUpdate, usernameCountryUpdate, passwordUpdate, languageUpdate, settingUpdate, paginateUserDetail, guestUserTransfer, getUserProfile,
} from "src/controller/auth";
import { verifyAccessToken } from "src/middleware/auth.token";


router.post("/social-login", socialLogin);

router.post("/custom-register", customRegister);

router.post("/custom-login", customLogin);

router.post("/mobile-login-send-otp", sendOtp_mobileLogin);

router.post("/mobile-login-verify-otp", verifyOtp_mobileLogin);

router.post("/email-login-send-otp", sendOtp_emailLogin); 

router.post("/email-login-verify-otp", verifyOtp_emailLogin);

router.post("/mobile-reset-password-send-otp", sendOtp_mobileResetPassword); 

router.post("/mobile-reset-password-verify-otp", verifyOtp_mobileResetPassword);

router.post("/mobile-reset-password", mobileResetPassword);

router.post("/email-reset-password-send-otp", sendOtp_emailResetPassword);

router.post("/email-reset-password-verify-otp", verifyOtp_emailResetPassword);

router.post("/email-reset-password", emailResetPassword);

router.post("/guest-register", guestRegister);

router.post("/avatar-fb", verifyAccessToken, avatarFbProfile);

router.post("/frame", verifyAccessToken, frameUpdate);

router.post("/country-username-update", verifyAccessToken, usernameCountryUpdate);

router.post("/update-password", verifyAccessToken, passwordUpdate);

router.post("/update-language", verifyAccessToken, languageUpdate);

router.post("/update-setting", verifyAccessToken, settingUpdate);

router.get("/user-detail", verifyAccessToken, userProfile);

router.post("/list-user-details", verifyAccessToken, userDetails);

router.put("/guest-user-transfer", verifyAccessToken, guestUserTransfer);

router.get("/paginate/list", paginateUserDetail);

router.get("/get-user-profile", getUserProfile);

export { router as AuthRouter };