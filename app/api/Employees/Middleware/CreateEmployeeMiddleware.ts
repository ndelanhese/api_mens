import { StatusTypes } from '@app/src/Shared/Domain/Enums/StatusTypes';
import HttpError from '@app/src/Shared/Domain/Exceptions/HttpError';
import { cpf } from 'cpf-cnpj-validator';
import { NextFunction, Request, Response } from 'express';
import joi from 'joi';
import { messages } from 'joi-translation-pt-br';

const createEmployeeMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const createSchema = joi.object({
    name: joi.string().required(),
    cpf: joi
      .string()
      .custom(value => {
        if (!cpf.isValid(value)) {
          throw new HttpError(400, 'CPF invalido');
        }
        return value;
      })
      .required(),
    rg: joi.string(),
    birth_date: joi.string().required(),
    phone: joi.string().required(),
    pis_pasep: joi.string().required(),
    admission_date: joi.string().required(),
    resignation_date: joi.string(),
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
  const status = req.body.status;
  if (status && !StatusTypes.isValid(status)) {
    return res.status(400).send({ message: 'Status inválido.' });
  }
};
export default createEmployeeMiddleware;

//TODO adicionar validação de data de nascimento, telefone, data de admissão e data
