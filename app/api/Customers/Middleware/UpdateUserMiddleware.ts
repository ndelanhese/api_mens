import validator from 'cpf-cnpj-validator';
import { NextFunction, Request, Response } from 'express';
import joi from 'joi';
import { messages } from 'joi-translation-pt-br';

const JoiWithValidator = joi.extend(validator);

const updateCustomerMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const updateSchema = joi.object({
    name: joi.string().min(3),
    cpf: JoiWithValidator.string().cpf(),
    rg: joi.string(),
    birth_date: joi.string(),
    phone: joi.string(),
    status: joi.string(),
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
  next();
};
export default updateCustomerMiddleware;
