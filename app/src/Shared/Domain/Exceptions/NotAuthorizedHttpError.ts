import HttpError from '@exceptions/HttpError';

export default class NotAuthorizedHttpError extends HttpError {
  constructor(message: string = 'Não autorizado.') {
    super(401, message);
  }
}
