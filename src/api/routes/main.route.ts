import express from 'express';
import {
  sendEMail,
  sendEMailOTP,
  sendEMailVerificationLink,
  verifyEmailOTP
} from '../controllers/mailer.controller';
import { getHealthInfo } from '../controllers/main.controller';
export class MainRoute {
  public static register(app: express.Application) {
	app.route('/api/v1/health/').get(getHealthInfo);
 app.route('/api/v1/sendEMail').post(sendEMail);
	app.route('/api/v1/sendEmailOTP').post(sendEMailOTP);
	app.route('/api/v1/verifyEmailOTP').get(verifyEmailOTP);
	app
		.route('/api/v1/sendEmailverificationLink')
		.post(sendEMailVerificationLink);
  }
}
