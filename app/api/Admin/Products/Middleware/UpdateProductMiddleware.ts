import { messages } from 'joi-translation-pt-br';
import { NextFunction, Request, Response } from 'express';
import joi from 'joi';

const updateProductMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const updateSchema = joi.object({
    type: joi.string().allow(''),
    part_number: joi.string().allow(''),
    description: joi.string().allow(''),
    currency: joi.string().allow(''),
    contributor_price: joi.number().allow(''),
    exempt_price: joi.number().allow(''),
    note: joi.string().allow(''),
    outlet: joi.boolean().allow(''),
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
