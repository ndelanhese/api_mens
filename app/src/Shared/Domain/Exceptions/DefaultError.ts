// import Sentry from '@sentry/node';
export default class DefaultError extends Error {
  public previous?: Object;

  constructor(message: string, previous?: Error) {
    super(message);
    this.previous = previous;
    // Sentry.captureException(previous);
  }
}
