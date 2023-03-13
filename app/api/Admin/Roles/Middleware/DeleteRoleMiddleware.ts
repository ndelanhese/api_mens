import { messages } from 'joi-translation-pt-br';
import { NextFunction, Request, Response } from 'express';
import joi from 'joi';

const deleteRoleMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const deleteSchema = joi.object({
    id: joi.number().required(),
  });
  const { error } = deleteSchema.validate(req.params, { messages });
  if (error) {
    const { message } = error.details[0];
    return res.status(400).send({ message });
  }
  next();
};
export default deleteRoleMiddleware;
