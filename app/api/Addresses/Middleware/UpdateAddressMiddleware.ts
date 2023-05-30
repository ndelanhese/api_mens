import { NextFunction, Request, Response } from 'express';
import joi from 'joi';
import { messages } from 'joi-translation-pt-br';

const updateAddressMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const updateSchema = joi.object({
    address: joi.string().allow(null, ''),
    number: joi.string().allow(null, ''),
    district: joi.string().allow(null, ''),
    postal_code: joi.string().allow(null, ''),
    city: joi.string().allow(null, ''),
    state: joi.string().allow(null, ''),
  });
  const updateIdSchema = joi.object({
    id: joi.number().required(),
  });
  const { error: errorBody } = updateSchema.validate(req.body, { messages });
  const { error: errorParams } = updateIdSchema.validate(req.params, {
    messages,
  });
  if (errorBody || errorParams) {
    const message =
      errorBody?.details[0].message || errorParams?.details[0].message;
    return res.status(400).send({ message });
  }
  next();
};
export default updateAddressMiddleware;
