import { Router, Request, Response } from 'express';

const router = Router();

router.post('/ping', (req: Request, res: Response) => {
  return res.status(200).json('pong');
});

export default router;
