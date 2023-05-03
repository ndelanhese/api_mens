import { NextFunction, Request, Response } from 'express';
import joi from 'joi';
import { messages } from 'joi-translation-pt-br';

const importProductsMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const importSchema = joi.object({
    file: joi.required(),
  });
  const { error } = importSchema.validate(req.files, { messages });
  if (error) {
    const { message } = error.details[0];
    return res.status(400).send({ message });
  }
  const file = req?.files?.file;
  if (!file || Array.isArray(file)) {
    return res
      .status(400)
      .send({ message: 'Por favor, envie um arquivo para ser importado' });
  }
  const getExtensionRegex = /\.(xls|xlsx)$/i;
  const match = file.name.match(getExtensionRegex);
  if (!match) {
    return res
      .status(400)
      .send({ message: 'Por favor, envie um arquivo .xls ou .xlsx' });
  }
  next();
};

export default importProductsMiddleware;
