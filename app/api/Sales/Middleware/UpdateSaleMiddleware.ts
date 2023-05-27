import { DiscountTypes } from '@app/src/Sales/Domain/Enums/DiscountTypes';
import { SaleStatusTypes } from '@app/src/Sales/Domain/Enums/SaleStatusTypes';
import { NextFunction, Request, Response } from 'express';
import joi from 'joi';
import { messages } from 'joi-translation-pt-br';

import { IProductInput } from './CreateSaleMiddleware.types';

const updateSaleMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const updateSchema = joi.object({
    date: joi.string(),
    observation: joi.string().required(),
    total_value: joi.number(),
    discount_amount: joi.number().allow(null),
    discount_type: joi.string().allow(null),
    final_value: joi.number(),
    status: joi.string(),
    customer_id: joi.number(),
    user_id: joi.number(),
    payments: joi.array().items(
      joi.object({
        type: joi.number().required(),
        installment: joi.number().required(),
      }),
    ),
    products: joi.array().items(
      joi.object({
        id: joi.number().required(),
        quantity: joi.number().min(1).required(),
        discount_amount: joi.number().allow(null),
        discount_type: joi.string().allow(null),
        final_value: joi.number().required(),
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
  if (
    req.body.discount_type &&
    !DiscountTypes.isValid(req.body.discount_type)
  ) {
    return res.status(400).send({ message: 'Tipo de desconto inválido.' });
  }
  let shouldContinue = true;
  const products = req.body.products;
  products.forEach((product: IProductInput) => {
    if (
      product.discount_type &&
      !DiscountTypes.isValid(product.discount_type)
    ) {
      shouldContinue = false;
      return res
        .status(400)
        .send({ message: 'Tipo de desconto de produto inválido.' });
    }
  });
  if (!shouldContinue) {
    return;
  }
  if (!SaleStatusTypes.isValid(req.body.status)) {
    return res.status(400).send({ message: 'Status inválido.' });
  }
  next();
};

export default updateSaleMiddleware;
