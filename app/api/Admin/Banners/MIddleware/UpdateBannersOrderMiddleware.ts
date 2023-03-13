import { NextFunction, Request, Response } from 'express';
import joi from 'joi';
import { messages } from 'joi-translation-pt-br';

const updateBannersOrderMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const reorderSchema = joi
    .array()
    .items(
      joi.object({
        id: joi.number().required(),
        order: joi.number().required(),
      }),
    )
    .required()
    .min(1);

  const { error } = reorderSchema.validate(req.body, { messages });
  if (error) {
    const { message } = error.details[0];
    return res.status(400).send({ message });
  }
  next();
};
export default updateBannersOrderMiddleware;
