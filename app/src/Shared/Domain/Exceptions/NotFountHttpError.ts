import HttpError from '@exceptions/HttpError';

export default class NotFoundHttpError extends HttpError {
  constructor(message = 'Not found') {
    super(404, message);
  }
}
