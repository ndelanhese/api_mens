import { OrderStatusTypes } from '@app/src/Orders/Domain/Enums/OrderStatusTypes';
import { NextFunction, Request, Response } from 'express';
import joi from 'joi';
import { messages } from 'joi-translation-pt-br';

const createOrderMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const createSchema = joi.object({
    date: joi.string().required(),
    observation: joi.string().allow(null, ''),
    description: joi.string().allow(null, ''),
    status: joi.string(),
    customer_id: joi.number().required(),
    user_id: joi.number().required(),
    products: joi
      .array()
      .items(
        joi.object({
          id: joi.number().required(),
          quantity: joi.number().required().min(1),
        }),
      )
      .required(),
  });
  const { error } = createSchema.validate(req.body, { messages });
  if (error) {
    const { message } = error.details[0];
    return res.status(400).send({ message });
  }
  if (!OrderStatusTypes.isValid(req.body.status)) {
    return res.status(400).send({ message: 'Status inválido.' });
  }
  next();
};

export default createOrderMiddleware;
