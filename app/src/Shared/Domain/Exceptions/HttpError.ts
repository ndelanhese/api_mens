import DefaultError from './DefaultError';

export default class HttpError extends DefaultError {
  public statusCode: number;

  constructor(statusCode: number, message: string, previous?: Error | unknown) {
    super(message, previous);
    this.statusCode = statusCode;
  }
}
