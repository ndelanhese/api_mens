import { messages } from 'joi-translation-pt-br';
import { NextFunction, Request, Response } from 'express';
import joi from 'joi';

const createEstimateMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const createSchema = joi.object({
    name: joi.string().required(),
    email: joi.string().required(),
    phone: joi.string().allow(''),
    corporate_name: joi.string().allow(''),
    cnpj: joi.string().allow(''),
    address: joi.string().allow(''),
    state: joi.string().allow(''),
    postal_code: joi.string().allow(''),
    district: joi.string().allow(''),
    city: joi.string().allow(''),
    products: joi
      .array()
      .items(
        joi
          .object()
          .keys({
            product_id: joi.number().required(),
            qtd: joi.number().required(),
          })
          .required(),
      )
      .required(),
  });
  const { error: errorBody } = createSchema.validate(req.body, { messages });

  if (errorBody) {
    const message = errorBody?.details[0].message;
    return res.status(400).send({ message });
  }

  next();
};

export default createEstimateMiddleware;
