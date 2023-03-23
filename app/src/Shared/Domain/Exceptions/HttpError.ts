import DefaultError from './DefaultError';

export default class HttpError extends DefaultError {
  public statusCode: number;
  constructor(statusCode: number, message: string, stack?: Error | unknown) {
    super(message, stack);
    this.statusCode = statusCode;
  }
}
