import { ProductStatusTypes } from '@app/src/Products/Domain/Enums/ProductStatusTypes';
import { NextFunction, Request, Response } from 'express';
import joi from 'joi';
import { messages } from 'joi-translation-pt-br';

const updateProductStockMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const updateSchema = joi.object({
    quantity: joi.number().min(0),
    status: joi.string().allow(null),
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
  if (req.body.status && !ProductStatusTypes.isValid(req.body.status)) {
    return res.status(400).send({ message: 'Status inválido.' });
  }
  next();
};

export default updateProductStockMiddleware;
