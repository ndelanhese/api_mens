import { StatusTypes } from '@app/src/Shared/Domain/Enums/StatusTypes';
import HttpError from '@exceptions/HttpError';
import { cpf } from 'cpf-cnpj-validator';
import { NextFunction, Request, Response } from 'express';
import joi from 'joi';
import { messages } from 'joi-translation-pt-br';

const updateEmployeeMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const updateSchema = joi.object({
    name: joi.string().min(3),
    cpf: joi.string().custom(value => {
      if (!cpf.isValid(value)) {
        throw new HttpError(400, 'CPF invalido');
      }
      return value;
    }),
    rg: joi.string(),
    birth_date: joi.string(),
    phone: joi.string(),
    pis_pasep: joi.string(),
    admission_date: joi.string(),
    resignation_date: joi.string(),
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
  const status = req.body.status;
  if (status && !StatusTypes.isValid(status)) {
    return res.status(400).send({ message: 'Status inválido.' });
  }
  next();
};
export default updateEmployeeMiddleware;
