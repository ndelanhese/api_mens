import { NextFunction, Request, Response } from 'express';
import joi from 'joi';
import { messages } from 'joi-translation-pt-br';

const createCustomerMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const createSchema = joi.object({
    //TODO Fazer as validações de cpf e rg e demais campos
    name: joi.string().required(),
    cpf: joi.string().required(),
    rg: joi.string().required(),
    birth_date: joi.string().required(),
    phone: joi.number().required(),
    status: joi.string(),
    address: joi
      .object({
        address: joi.string().required(),
        number: joi.number().required(),
        district: joi.string().required(),
        postal_code: joi.string().required(),
        city: joi.string().required(),
        state: joi.string().required(),
      })
      .required()
      .min(1),
  });
  const { error } = createSchema.validate(req.body, { messages });
  if (error) {
    const { message } = error.details[0];
    return res.status(400).send({ message });
  }
  next();
};
export default createCustomerMiddleware;
