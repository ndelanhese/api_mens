import HttpError from '@exceptions/HttpError';

export default class NotAuthorizedHttpError extends HttpError {
  constructor(previous?: Error | unknown) {
    super(401, 'Não autorizado.', previous);
  }
}
