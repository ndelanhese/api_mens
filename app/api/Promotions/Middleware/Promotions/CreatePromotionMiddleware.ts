import { DiscountTypes } from '@app/src/Promotions/Domain/Enums/DiscountTypes';
import { PromotionStatusTypes } from '@app/src/Promotions/Domain/Enums/PromotionStatusTypes';
import { NextFunction, Request, Response } from 'express';
import joi from 'joi';
import { messages } from 'joi-translation-pt-br';

const createPromotionMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const createSchema = joi.object({
    name: joi.string().required(),
    description: joi.string().required(),
    promotion_category_id: joi.number().required(),
    products: joi
      .array()
      .items(
        joi.object({
          id: joi.number().required(),
        }),
      )
      .allow(null),
    initial_date: joi.string().allow(null, ''),
    final_date: joi.string().allow(null, ''),
    status: joi.string().allow(null, ''),
    discount_amount: joi.number().allow(null),
    discount_type: joi.string().allow(null, ''),
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
  if (!PromotionStatusTypes.isValid(req.body.status)) {
    return res.status(400).send({ message: 'Status inválido.' });
  }

  next();
};

export default createPromotionMiddleware;
