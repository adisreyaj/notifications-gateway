import { Request, Response } from "express";
import {
  generateRandomCode,
  sendEmailHelperFunction,
  sendEmailLinkForVerification,
  sendEmailOTPForVerification
} from "../helpers/mailer.helper";

import {
  deleteValueFromCache,
  getValueFromCache,
  saveToCache
} from "../helpers/cache.helper";

import * as bcrypt from "bcrypt";

/*-------------------------------------------------------------
Description: Send Email with the received content
Input: req as Request and res as Response
Output: Promise
-------------------------------------------------------------*/

export async function sendEMail(req: Request, res: Response): Promise<any> {
  const body = req.body;
  if (Object.keys(body).length === 0) {
    res
      .json({
        message: "Bad Request!"
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
      .catch(err => {
        console.log(err);
      });
  }
}

let emailOTPHash: string;

/*-------------------------------------------------------------
Description: Send OTP Email Controller which will be sending the
	OTP to the receiver.
Input: req as Request and res as Response
Output: Promise
-------------------------------------------------------------*/
export async function sendEMailOTP(req: Request, res: Response): Promise<any> {
  const body = req.body;
  if (Object.keys(body).length === 0) {
    res
      .json({
        message: "Bad Request!"
      })
      .status(400);
  } else {
    const OTP = generateRandomCode(5);
    emailOTPHash = bcrypt.hashSync(OTP, 10);
    saveToCache(body.receiverEmail, emailOTPHash);
    sendEmailOTPForVerification(
      body.senderEmail,
      body.senderName,
      body.receiverEmail,
      OTP
    )
      .then((data: any) => {
        res.status(200).json({
          message: "Email OTP sent successfully"
        });
      })
      .catch(err => {
        res.status(500).json({
          error: "Failed to Sent OTP"
        });
      });
  }
}

/*-------------------------------------------------------------
Description: Verify The Email OTP by validating the id query param
							with the data saved in the cache.
Input: req as Request and res as Response
Output: Promise
-------------------------------------------------------------*/

export async function verifyEmailOTP(
  req: Request,
  res: Response
): Promise<any> {
  const OTP = req.query.id;
  const identifier = req.query.identifier;
  if (
    (!OTP || OTP === (null || undefined)) &&
    (!identifier || identifier === (null || undefined))
  ) {
    res.status(400).json({
      error: "Bad Request"
    });
  } else {
    // Get the saved OTP Hash from the Cache
    const OTPCache = getValueFromCache(identifier);
    if (OTPCache) {
      // Compare the OTP and the OTPHash which is store in the Cache
      if (bcrypt.compareSync(OTP, OTPCache)) {
        res.status(200).json({
          message: "Verified"
        });
        // Delete the Code from Cache once it is verified
        deleteValueFromCache(identifier);
      } else {
        res.status(401).json({
          error: "Verification Failed"
        });
        // Delete the Code from Cache if verification failed
        deleteValueFromCache(identifier);
      }
    } else {
      res.status(404).json({
        error: "OTP Expired!Please generate new OTP"
      });
    }
  }
}

/*-------------------------------------------------------------
Description: Send a verification link to the user
Input: req as Request and res as Response
Output: Promise
-------------------------------------------------------------*/

export async function sendEMailVerificationLink(req: Request, res: Response) {
  const body = req.body;
  if (Object.keys(body).length === 0) {
    res
      .json({
        message: "Bad Request!"
      })
      .status(400);
  } else {
    const OTP = generateRandomCode(30);
    sendEmailLinkForVerification(
      body.senderEmail,
      body.senderName,
      body.receiverEmail,
      OTP,
      body.redirectURI
    )
      .then(() => {
        res.status(200).json({
          message: "Email Verification Link Sent"
        });
      })
      .catch(err => {
        res.status(500).json({
          error: err
        });
      });
  }
}
