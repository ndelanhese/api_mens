import { NextFunction, Request, Response } from 'express';
import joi from 'joi';
import { messages } from 'joi-translation-pt-br';

const updateProductMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const updateSchema = joi.object({
    part_number: joi.string(),
    name: joi.string(),
    description: joi.string(),
    purchase_price: joi.number().allow(null),
    price: joi.number(),
    size: joi.string().allow(null),
    color: joi.string().allow(null),
    quantity: joi.number().min(0),
    category_id: joi.number(),
    brand_id: joi.number(),
    supplier_id: joi.number(),
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

export default updateProductMiddleware;
