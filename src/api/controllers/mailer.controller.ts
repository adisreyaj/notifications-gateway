import { Request, Response } from 'express';
import {
  generateRandomCode,
  sendEmailForVerification,
  sendEmailHelperFunction
} from '../helpers/mailer.helper';
export class MailController {
  public async sendEMail(req: Request, res: Response) {
	const body = req.body;
	console.log(Object.keys(body));
	if (Object.keys(body).length === 0) {
		res
		.json({
			message: 'Bad Request!'
		})
		.status(400);
	} else {
		sendEmailHelperFunction(
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
  public async sendEMailOTP(req: Request, res: Response) {
	const body = req.body;
	console.log(Object.keys(body));
	if (Object.keys(body).length === 0) {
		res
		.json({
			message: 'Bad Request!'
		})
		.status(400);
	} else {
		const OTP = generateRandomCode(5);
		sendEmailForVerification(
		body.senderEmail,
		body.senderName,
		body.receiverEmail,
		OTP
		)
		.then((data: any) => {
			res.status(200).json({
			OTP
			});
		})
		.catch((err) => {
			console.log(err);
		});
	}
  }
}
