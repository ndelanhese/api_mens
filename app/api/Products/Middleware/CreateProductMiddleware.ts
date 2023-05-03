import { NextFunction, Request, Response } from 'express';
import joi from 'joi';
import { messages } from 'joi-translation-pt-br';

const createProductMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const createSchema = joi.object({
    type: joi.string().required(),
    part_number: joi.string().required(),
    description: joi.string().required(),
    currency: joi.string().allow(null),
    contributor_price: joi.number().allow('', null),
    exempt_price: joi.number().allow('', null),
    outlet: joi.boolean().required(),
    observation: joi.string().allow('', null),
    disclaimer: joi.string().allow('', null),
  });
  const { error } = createSchema.validate(req.body, { messages });
  if (error) {
    const { message } = error.details[0];
    return res.status(400).send({ message });
  }
  next();
};

export default createProductMiddleware;
