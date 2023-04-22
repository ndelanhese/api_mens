import HttpError from '@exceptions/HttpError';

export default class NotFoundHttpError extends HttpError {
  constructor(previous?: Error | unknown) {
    super(404, 'Não encontrado', previous);
  }
}
