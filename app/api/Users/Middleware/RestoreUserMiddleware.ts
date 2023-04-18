import { NextFunction, Request, Response } from 'express';
import joi from 'joi';
import { messages } from 'joi-translation-pt-br';

const restoreUserMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const restoreSchema = joi.object({
    id: joi.number().required(),
  });
  const { error } = restoreSchema.validate(req.params, { messages });
  if (error) {
    const { message } = error.details[0];
    return res.status(400).send({ message });
  }
  next();
};
export default restoreUserMiddleware;
