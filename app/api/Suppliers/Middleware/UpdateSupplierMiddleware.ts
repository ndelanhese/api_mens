import { StatusTypes } from '@app/src/Shared/Domain/Enums/StatusTypes';
import HttpError from '@exceptions/HttpError';
import { cnpj } from 'cpf-cnpj-validator';
import { NextFunction, Request, Response } from 'express';
import joi from 'joi';
import { messages } from 'joi-translation-pt-br';

const updateSupplierMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const updateSchema = joi.object({
    contact_name: joi.string().required(),
    corporate_name: joi.string().required(),
    cnpj: joi.string().custom(value => {
      if (!cnpj.isValid(value)) {
        throw new HttpError(400, 'CNPJ invalido');
      }
      return value;
    }),
    status: joi.string(),
    address: joi.object({
      id: joi.number().required(),
      address: joi.string().required(),
      number: joi.number().required(),
      district: joi.string().required(),
      postal_code: joi.string().required(),
      city: joi.string().required(),
      state: joi.string().required(),
    }),
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
export default updateSupplierMiddleware;
