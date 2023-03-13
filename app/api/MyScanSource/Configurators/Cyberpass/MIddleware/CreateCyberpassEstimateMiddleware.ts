import { messages } from 'joi-translation-pt-br';
import { NextFunction, Request, Response } from 'express';
import joi from 'joi';

const createEquinixEstimateMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const createSchema = joi.object({
    agent: joi
      .object({
        company_name: joi.string().required(),
        cnpj: joi.string().pattern(/^\d+$/).required(),
        name: joi.string().required(),
        email: joi.string().email().required(),
        phone: joi.string().pattern(/^\d+$/).required(),
      })
      .required(),
    observations: joi.string().allow(''),
    products: joi
      .array()
      .items(
        joi.object({
          form_id: joi.number().required(),
          quantity: joi.number().required(),
          price: joi.number().required(),
        }),
      )
      .required(),
  });
  const { error } = createSchema.validate(req.body, { messages });
  if (error) {
    const { message } = error.details[0];
    return res.status(400).send({ message });
  }
  next();
};

export default createEquinixEstimateMiddleware;
