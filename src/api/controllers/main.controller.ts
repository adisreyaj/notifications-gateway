import { Request, Response } from 'express';

export async function getHealthInfo(req: Request, res: Response) {
  res.status(200).json({
	status: 'up'
  });
}
