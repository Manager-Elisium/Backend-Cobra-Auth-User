import { SESClient, SendTemplatedEmailCommand } from "@aws-sdk/client-ses";
import { success as LogSucess, error as LogError } from './../common/logger';

const sesClient = new SESClient({
  region: process.env.AWS_REGION,
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY
  },
});

async function sendEmailUsingSES(templateName: string, templateData: any): Promise<boolean> {
  try {
    const params = {
      Destination: {
        ToAddresses: [templateData.email],
      },
      Source: process.env.SENDER_EMAIL,
      Template: templateName,
      TemplateData: JSON.stringify({ ...templateData })
    };

    const command = new SendTemplatedEmailCommand(params);
    const sendTemplateUsingSES = await sesClient.send(command);

    if (!!sendTemplateUsingSES.MessageId) {
      LogSucess(`Email sent with message id: ${sendTemplateUsingSES.MessageId}`);
      return true;
    } else {
      LogError("Failed to send email using SES");
      return false;
    }
  } catch (error) {
    LogError("Error while sending email using SES", error);
    return false;
  }
}

export { sendEmailUsingSES };