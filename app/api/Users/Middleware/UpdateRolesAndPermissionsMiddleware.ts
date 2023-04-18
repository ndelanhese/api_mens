import { NextFunction, Request, Response } from 'express';
import joi from 'joi';
import { messages } from 'joi-translation-pt-br';

const updateRolesAndPermissionMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const updateRoleAndPermissionSchema = joi.object({
    role_id: joi.array().items(joi.number()).required(),
    permissions: joi.array().items(joi.number()).required(),
  });
  const userSchema = joi.object({
    id: joi.number().required(),
  });
  const { error: errorBody } = updateRoleAndPermissionSchema.validate(
    req.body,
    {
      messages,
    },
  );
  const { error: errorParams } = userSchema.validate(req.params, { messages });
  if (errorBody || errorParams) {
    const message =
      errorBody?.details[0].message || errorParams?.details[0].message;
    return res.status(400).send({ message });
  }
  next();
};
export default updateRolesAndPermissionMiddleware;
