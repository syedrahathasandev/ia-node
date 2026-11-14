
import { Resend } from "resend";
import { Config } from "../config/index.js";

const resend = new Resend(Config.RESEND_API_KEY);

export async function sendMail(to = [], subject, html) {
    const { data, error } = await resend.emails.send({
        from: Config.MAIL_FROM,
        to,
        subject,
        html,
    });

    if (error) {
        throw new Error(error.message);
    }

    return data;
}
