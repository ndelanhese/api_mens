import HttpError from '@exceptions/HttpError';

export default class NotAuthorizedHttpError extends HttpError {
  constructor(message = 'Não autorizado.') {
    super(401, message);
  }
}
