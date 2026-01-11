"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.sendEmailUsingSES = sendEmailUsingSES;
const client_ses_1 = require("@aws-sdk/client-ses");
const logger_1 = require("./../common/logger");
const sesClient = new client_ses_1.SESClient({
    region: process.env.AWS_REGION,
    credentials: {
        accessKeyId: process.env.AWS_ACCESS_KEY_ID,
        secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY
    },
});
async function sendEmailUsingSES(templateName, templateData) {
    try {
        const params = {
            Destination: {
                ToAddresses: [templateData.email],
            },
            Source: process.env.SENDER_EMAIL,
            Template: templateName,
            TemplateData: JSON.stringify({ ...templateData })
        };
        const command = new client_ses_1.SendTemplatedEmailCommand(params);
        const sendTemplateUsingSES = await sesClient.send(command);
        if (!!sendTemplateUsingSES.MessageId) {
            (0, logger_1.success)(`Email sent with message id: ${sendTemplateUsingSES.MessageId}`);
            return true;
        }
        else {
            (0, logger_1.error)("Failed to send email using SES");
            return false;
        }
    }
    catch (error) {
        (0, logger_1.error)("Error while sending email using SES", error);
        return false;
    }
}
