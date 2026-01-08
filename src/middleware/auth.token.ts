import { NextFunction, Request, Response } from "express";
import jsonwebtoken, { SignOptions, verify } from "jsonwebtoken";
import StandardError from "./../common/standard-error";
import { ErrorCodeMap, ErrorCodes } from "./../common/error-type";


export async function signAccessToken(data: any) {
    const payload = {
        ...data
    };
    const secret = process.env.AUTH_KEY ?? "";
    const options: SignOptions = {
        expiresIn: "700d",
        issuer: "cobra.user.com",
        audience: JSON.stringify(payload)
    };
    let getToken = await jsonwebtoken.sign(payload, secret, options);
    if (!getToken) {
        throw new StandardError(
            ErrorCodes.INVALID_AUTH,
            "Invalid Login."
        );
    }
    return getToken;
}


export async function verifyAccessToken(
    request: Request,
    response: Response,
    next: NextFunction
) {
    if (!request?.headers["authorization"]) {
        return response
            .status(ErrorCodeMap.INVALID_AUTH)
            .json({ message: "Invalid Authorization." });
    }
    const authHeader = request?.headers["authorization"]?.split(" ");
    if (!authHeader[1]) {
        return response
            .status(ErrorCodeMap.INVALID_AUTH)
            .json({ message: "Invalid Authorization." });
    }
    return new Promise((resolve, reject) => {
        verify(
            authHeader[1],
            process.env.AUTH_KEY ?? "",
            (error, decoded) => {
                if (error) {
                    return response
                        .status(ErrorCodeMap.INVALID_AUTH)
                        .json({ message: error });
                } else {
                    request.body.token = JSON.parse(JSON.stringify(decoded));
                    next();
                }
            }
        );
    });
}