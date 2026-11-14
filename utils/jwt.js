
import jwt from "jsonwebtoken";
import { Config } from "../config/index.js";

export function generateEmailVerificationToken(userId) {
    return jwt.sign(
        {
            sub: userId,
            purpose: "email-verification",
        },
        Config.JWT_EMAIL_VERIFICATION_SECRET,
        {
            expiresIn: "15m",
            issuer: "ia-node",
            audience: "email-verification",
        }
    );
}

export function verifyEmailVerificationToken(token) {
    return jwt.verify(
        token,
        Config.JWT_EMAIL_VERIFICATION_SECRET,
        {
            issuer: "ia-node",
            audience: "email-verification",
        }
    );
}
