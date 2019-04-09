import express from 'express';
import { MailController } from '../controllers/mailer.controller';
import { MainController } from '../controllers/main.controller';
export class MainRoute {
  public static register(app: express.Application) {
	app.route('/api/v1/health/').get(MainController.getHealthInfo);
	app.route('/api/v1/sendEMail').post(new MailController().sendEMail);
	app.route('/api/v1/sendEmailOTP').post(new MailController().sendEMailOTP);
  }
}
