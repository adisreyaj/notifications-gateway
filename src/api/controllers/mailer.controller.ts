import { Request, Response } from 'express';
import * as nodemailer from 'nodemailer';
export class MailController {
  public static async sendMail(req: Request, res: Response) {
	const body = req.body;
	console.log(body);
	if (req.body === null || req.body === undefined || req.body === {}) {
		res
		.json({
			message: 'Bad Request!'
		})
		.status(400);
	} else {
		this.sendEmail(
		body.senderEmail,
		body.senderName,
		body.receiverEmail,
		body.subject,
		body.body
		)
		.then((data: any) => {
			res.status(200).json({
			message: data
			});
		})
		.catch((err) => {
			console.log(err);
		});
	}
  }

  private static async sendEmail(
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
}
