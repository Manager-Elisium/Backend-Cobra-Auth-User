
import axios from "axios";

import { ErrorCodes } from "./error-type";
import StandardError from "./standard-error";

interface SmsData {
    mobile: string;
}

interface SmsResponse {
    otp?: string;
}

async function sendSms(data: SmsData): Promise<SmsResponse> {
    const { mobile } = data;
    const params = new URLSearchParams();
    const randomNumber = Math.floor(Math.random() * 10000 + 1);
    params.append("apikey", process.env.TEXTLOCAL_API_KEY);
    params.append("numbers", mobile);
    params.append("sender", "COBRA");
    params.append("test", "true");
    params.append(
        "message",
        `Your Cobra one - time password(OTP) is ${randomNumber}.This is valid for 15 minutes and is usable only once.Please do not share with anyone.\nTeam Cobra.`
    );
    const request = await axios.post("https://api.textlocal.in/send/", params);
    if (request.data.status === "success") {
        return {
            otp: "123456",
        };
    } else {
        throw new StandardError(
            ErrorCodes.INTERNAL_SERVER_ERROR,
            "OTP Sending Error."
        );
    }
}

export { sendSms, SmsData, SmsResponse };