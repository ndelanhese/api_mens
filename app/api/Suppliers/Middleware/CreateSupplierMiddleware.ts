import { StatusTypes } from '@app/src/Shared/Domain/Enums/StatusTypes';
import HttpError from '@app/src/Shared/Domain/Exceptions/HttpError';
import { cnpj } from 'cpf-cnpj-validator';
import { NextFunction, Request, Response } from 'express';
import joi from 'joi';
import { messages } from 'joi-translation-pt-br';

const createSupplierMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const createSchema = joi.object({
    contact_name: joi.string().required(),
    corporate_name: joi.string().required(),
    cnpj: joi
      .string()
      .custom(value => {
        if (!cnpj.isValid(value)) {
          throw new HttpError(400, 'CNPJ invalido');
        }
        return value;
      })
      .required(),
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
  const status = req.body.status;
  if (status && !StatusTypes.isValid(status)) {
    return res.status(400).send({ message: 'Status inválido.' });
  }
  next();
};
export default createSupplierMiddleware;
