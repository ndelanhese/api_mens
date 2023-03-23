import HttpError from '@exceptions/HttpError';

export default class NotAuthorizedHttpError extends HttpError {
  constructor(stack?: Error | unknown) {
    super(401, 'Não autorizado.', stack);
  }
}
