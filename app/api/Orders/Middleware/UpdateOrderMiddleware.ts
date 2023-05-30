import { OrderStatusTypes } from '@app/src/Orders/Domain/Enums/OrderStatusTypes';
import { NextFunction, Request, Response } from 'express';
import joi from 'joi';
import { messages } from 'joi-translation-pt-br';

const updateOrderMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const updateSchema = joi.object({
    date: joi.string(),
    observation: joi.string().required(),
    description: joi.string().required(),
    status: joi.string(),
    customer_id: joi.number(),
    user_id: joi.number(),
    products: joi.array().items(
      joi.object({
        id: joi.number().required(),
        quantity: joi.number().min(1).required(),
      }),
    ),
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
  if (!OrderStatusTypes.isValid(req.body.status)) {
    return res.status(400).send({ message: 'Status inválido.' });
  }
  next();
};

export default updateOrderMiddleware;
