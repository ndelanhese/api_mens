import { NextFunction, Request, Response } from 'express';
import joi from 'joi';
import { messages } from 'joi-translation-pt-br';

const deleteSaleMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const deleteSchema = joi.object({
    observation: joi.string(),
  });
  const deleteIdSchema = joi.object({
    id: joi.number().required(),
  });
  const { error: errorBody } = deleteSchema.validate(req.body, { messages });
  const { error: errorParams } = deleteIdSchema.validate(req.params, {
    messages,
  });
  if (errorBody || errorParams) {
    const message =
      errorBody?.details[0].message || errorParams?.details[0].message;
    return res.status(400).send({ message });
  }
  next();
};

export default deleteSaleMiddleware;
