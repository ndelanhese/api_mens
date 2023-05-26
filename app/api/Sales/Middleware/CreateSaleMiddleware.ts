import { DiscountTypes } from '@app/src/Sales/Domain/Enums/DiscountTypes';
import { SaleStatusTypes } from '@app/src/Sales/Domain/Enums/SaleStatusTypes';
import { NextFunction, Request, Response } from 'express';
import joi from 'joi';
import { messages } from 'joi-translation-pt-br';

import { IProductInput } from './CreateSaleMiddleware.types';

const createSaleMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const createSchema = joi.object({
    date: joi.string().required(),
    observation: joi.string().allow(null),
    total_value: joi.number().required(),
    discount_amount: joi.number().allow(null),
    discount_type: joi.string().allow(null),
    final_value: joi.number().required(),
    status: joi.string(),
    customer_id: joi.number().required(),
    user_id: joi.number().required(),
    payments: joi
      .array()
      .items(
        joi.object({
          type: joi.number().required(),
          installment: joi.number().required(),
        }),
      )
      .required(),
    products: joi
      .array()
      .items(
        joi.object({
          id: joi.number().required(),
          quantity: joi.number().required().min(1),
          discount_amount: joi.number().allow(null),
          discount_type: joi.string().allow(null),
          final_value: joi.number().required(),
        }),
      )
      .required(),
  });
  const { error } = createSchema.validate(req.body, { messages });
  if (error) {
    const { message } = error.details[0];
    return res.status(400).send({ message });
  }
  if (
    req.body.discount_type &&
    !DiscountTypes.isValid(req.body.discount_type)
  ) {
    return res.status(400).send({ message: 'Tipo de desconto inválido.' });
  }
  if (!SaleStatusTypes.isValid(req.body.status)) {
    return res.status(400).send({ message: 'Status inválido.' });
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
  next();
};

export default createSaleMiddleware;
