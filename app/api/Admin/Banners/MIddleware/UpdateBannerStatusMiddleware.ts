import { NextFunction, Request, Response } from 'express';
import joi from 'joi';
import { messages } from 'joi-translation-pt-br';

const updateBannerStatusMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const updateStatusSchema = joi.object({
    status: joi.string().required(),
  });

  const verifySchema = joi.object({
    id: joi.number().required(),
  });

  const errorBody = updateStatusSchema.validate(req.body, { messages });
  const errorId = verifySchema.validate(req.params, { messages });
  const error = errorBody.error || errorId.error;
  if (error) {
    const { message } = error.details[0];
    return res.status(400).send({ message });
  }
  next();
};
export default updateBannerStatusMiddleware;
