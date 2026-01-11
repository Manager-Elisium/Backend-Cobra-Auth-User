"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.sendSms = sendSms;
const axios_1 = __importDefault(require("axios"));
const error_type_1 = require("./error-type");
const standard_error_1 = __importDefault(require("./standard-error"));
async function sendSms(data) {
    const { mobile } = data;
    const params = new URLSearchParams();
    const randomNumber = Math.floor(Math.random() * 10000 + 1);
    params.append("apikey", process.env.TEXTLOCAL_API_KEY);
    params.append("numbers", mobile);
    params.append("sender", "COBRA");
    params.append("test", "true");
    params.append("message", `Your Cobra one - time password(OTP) is ${randomNumber}.This is valid for 15 minutes and is usable only once.Please do not share with anyone.\nTeam Cobra.`);
    const request = await axios_1.default.post("https://api.textlocal.in/send/", params);
    if (request.data.status === "success") {
        return {
            otp: "123456",
        };
    }
    else {
        throw new standard_error_1.default(error_type_1.ErrorCodes.INTERNAL_SERVER_ERROR, "OTP Sending Error.");
    }
}
