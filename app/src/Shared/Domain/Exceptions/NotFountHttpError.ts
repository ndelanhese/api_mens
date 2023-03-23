import HttpError from '@exceptions/HttpError';

export default class NotFoundHttpError extends HttpError {
  constructor(stack?: Error | unknown) {
    super(404, 'Não encontrado', stack);
  }
}
