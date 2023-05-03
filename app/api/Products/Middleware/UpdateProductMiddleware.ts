import { NextFunction, Request, Response } from 'express';
import joi from 'joi';
import { messages } from 'joi-translation-pt-br';

const updateProductMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const updateSchema = joi.object({
    type: joi.string().allow('', null),
    part_number: joi.string().allow(''),
    description: joi.string().allow(''),
    currency: joi.string().allow('', null),
    contributor_price: joi.number().allow('', null),
    exempt_price: joi.number().allow('', null),
    outlet: joi.boolean().allow(''),
    observation: joi.string().allow('', null),
    disclaimer: joi.string().allow('', null),
  });
  const updateIdSchema = joi.object({
    product_id: joi.number().required(),
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

export default updateProductMiddleware;
