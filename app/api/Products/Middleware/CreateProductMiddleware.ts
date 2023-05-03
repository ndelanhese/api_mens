import { NextFunction, Request, Response } from 'express';
import joi from 'joi';
import { messages } from 'joi-translation-pt-br';

const createProductMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const createSchema = joi.object({
    part_number: joi.string().required(),
    name: joi.string().required(),
    description: joi.string().required(),
    purchase_price: joi.number().allow(null),
    price: joi.number().required(),
    size: joi.string().allow(null),
    color: joi.string().allow(null),
    quantity: joi.number().required().min(0),
    category_id: joi.number().required(),
    brand_id: joi.number().required(),
    supplier_id: joi.number().required(),
  });
  const { error } = createSchema.validate(req.body, { messages });
  if (error) {
    const { message } = error.details[0];
    return res.status(400).send({ message });
  }
  next();
};

export default createProductMiddleware;
