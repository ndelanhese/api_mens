import { NextFunction, Request, Response } from 'express';
import sqlstring from 'sqlstring';

const sanitizeMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const { params: paramsData, query: queryData, body: bodyData } = req;
  const body = JSON.stringify(bodyData);
  const query = JSON.stringify(queryData);
  const params = JSON.stringify(paramsData);

  const escapedBodyString = sqlstring.escape(body);
  const escapedQueryString = sqlstring.escape(query);
  const escapedParamsString = sqlstring.escape(params);

  if (body === escapedBodyString) {
    return next();
  }
  if (query === escapedQueryString) {
    return next();
  }
  if (params === escapedParamsString) {
    return next();
  }

  return res
    .status(400)
    .json({ error: 'O código contém parâmetros não seguros.' });
};

export default sanitizeMiddleware;
