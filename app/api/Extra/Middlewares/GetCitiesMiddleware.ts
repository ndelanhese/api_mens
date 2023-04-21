import { States } from '@app/src/Extras/Domain/Enums/States';
import { NextFunction, Request, Response } from 'express';
import joi from 'joi';
import { messages } from 'joi-translation-pt-br';

const GetCitiesMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const createSchema = joi.object({
    uf: joi.string().max(2).required(),
  });
  const { error } = createSchema.validate(req.query, { messages });
  if (error) {
    const { message } = error.details[0];
    return res.status(400).send({ message });
  }
  if (!States.isValid(String(req.query.uf))) {
    return res.status(400).send({ message: 'Estado inválido.' });
  }
  next();
};

export default GetCitiesMiddleware;
