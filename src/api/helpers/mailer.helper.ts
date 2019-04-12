import * as nodemailer from "nodemailer";

/*-------------------------------------------------------------
Description: Send Email Function which sends out the email with
  the givem contents
Input: senderEmail as String, senderName as String,
        receiverEmail as String, subject as String,
        body as String
Output: Promise of void
-------------------------------------------------------------*/
export async function sendEmailHelperFunction(
  senderEmail: string,
  senderName: string,
  receiverEmail: string,
  subject: string,
  body: string
): Promise<void> {
  const testAccount = await nodemailer.createTestAccount();
  const transporter = createEmailTransport(testAccount.user, testAccount.pass);
  // send mail with defined transport object
  const info = await transporter.sendMail({
    from: `"${senderName}" <${senderEmail}>`,
    to: receiverEmail,
    subject,
    text: body,
    html: "<b>Hello world?</b>"
  });

  console.log("Message sent: %s", info);
  console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
}

/*-------------------------------------------------------------
Description: Send The OTP via email to the receipient
Input: senderEmail as String, senderName as String,
        receiverEmail as String, OTP as string
Output: Promise of void
-------------------------------------------------------------*/

export async function sendEmailOTPForVerification(
  senderEmail: string,
  senderName: string,
  receiverEmail: string,
  OTP: string
): Promise<void> {
  const testAccount = await nodemailer.createTestAccount();
  const transporter = createEmailTransport(testAccount.user, testAccount.pass);
  const info = await transporter.sendMail({
    from: `"${senderName}" <${senderEmail}>`,
    to: receiverEmail,
    subject: "Here is your OTP",
    text: `Your OTP is ${OTP}`,
    html: "<b>Hello world?</b>"
  });

  console.log("Message sent: %s", info.messageId);
  console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
  // send mail with defined transport object
}

/*-------------------------------------------------------------
Description: The function generates random string based on the length
Input: length as Number
Output: String
-------------------------------------------------------------*/
export function generateRandomCode(length: number): string {
  let text = "";
  const possible =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

  for (let i = 0; i < length; i++) {
    text += possible.charAt(Math.floor(Math.random() * possible.length));
  }

  return text;
}

/*-------------------------------------------------------------
Description: Send a Verification Link via email to the receipient
Input: senderEmail as String, senderName as String,
        receiverEmail as String, randomHash as string,
        redirectURI as String
Output: Promise of void
-------------------------------------------------------------*/

export async function sendEmailLinkForVerification(
  senderEmail: string,
  senderName: string,
  receiverEmail: string,
  randomHash: string,
  redirectURI: string
): Promise<void> {
  const testAccount = await nodemailer.createTestAccount();
  const transporter = createEmailTransport(testAccount.user, testAccount.pass);
  // Construct the Verification Link
  const url = `${redirectURI}/verify?id=${randomHash}`;
  const info = await transporter.sendMail({
    from: `"${senderName}" <${senderEmail}>`,
    to: receiverEmail,
    subject: "Here is your OTP",
    html: `<a href="${url}" target="_blank">Verify Now</a>`
  });

  console.log("Message sent: %s", info.messageId);
  console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
  // send mail with defined transport object
}

export async function verifyEmailLink(
  randomHash: string,
  verifyHash: string
): Promise<boolean> {
  if (randomHash === verifyHash) {
    return true;
  } else {
    return false;
  }
}

/*-------------------------------------------------------------------
Description: Create a Email Transport which will be used by the server
Input: user as String and pass as String
Output: Mail
---------------------------------------------------------------------*/
function createEmailTransport(user: string, pass: string) {
  return nodemailer.createTransport({
    host: "smtp.ethereal.email",
    port: 587,
    secure: false, // true for 465, false for other ports
    auth: {
      user, // generated ethereal user
      pass // generated ethereal password
    }
  });
}
