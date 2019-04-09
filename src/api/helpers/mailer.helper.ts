import * as nodemailer from 'nodemailer';
export async function sendEmailHelperFunction(
  senderEmail: string,
  senderName: string,
  receiverEmail: string,
  subject: string,
  body: string
): Promise<void> {
  const testAccount = await nodemailer.createTestAccount();

  // create reusable transporter object using the default SMTP transport
  const transporter = nodemailer.createTransport({
	host: 'smtp.ethereal.email',
	port: 587,
	secure: false, // true for 465, false for other ports
	auth: {
		user: testAccount.user, // generated ethereal user
		pass: testAccount.pass // generated ethereal password
	}
  });

  // send mail with defined transport object
  const info = await transporter.sendMail({
	from: `"${senderName}" <${senderEmail}>`,
	to: receiverEmail,
	subject,
	text: body,
	html: '<b>Hello world?</b>'
  });

  console.log('Message sent: %s', info.messageId);
  console.log('Preview URL: %s', nodemailer.getTestMessageUrl(info));
}

export async function sendEmailForVerification(
  senderEmail: string,
  senderName: string,
  receiverEmail: string,
  OTP: string
): Promise<void> {
  const testAccount = await nodemailer.createTestAccount();
  // create reusable transporter object using the default SMTP transport
  const transporter = nodemailer.createTransport({
	host: 'smtp.ethereal.email',
	port: 587,
	secure: false, // true for 465, false for other ports
	auth: {
		user: testAccount.user, // generated ethereal user
		pass: testAccount.pass // generated ethereal password
	}
  });
  const info = await transporter.sendMail({
	from: `"${senderName}" <${senderEmail}>`,
	to: receiverEmail,
	subject: 'Here is your OTP',
	text: `Your OTP is ${OTP}`,
	html: '<b>Hello world?</b>'
  });

  console.log('Message sent: %s', info.messageId);
  console.log('Preview URL: %s', nodemailer.getTestMessageUrl(info));
  // send mail with defined transport object
}

export function generateRandomCode(length: number): string {
  let text = '';
  const possible =
	'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';

  for (let i = 0; i < length; i++) {
	text += possible.charAt(Math.floor(Math.random() * possible.length));
  }

  return text;
}
