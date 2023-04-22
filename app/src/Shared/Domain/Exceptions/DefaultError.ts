import * as Sentry from '@sentry/node';

export default class DefaultError extends Error {
  constructor(message: string, previous?: Error | unknown) {
    super(message);
    if (previous instanceof Error) {
      this.stack = previous.stack;
    }
    if (typeof previous === 'string') {
      this.stack = previous;
    }
    DefaultError.sendSentryError(this);
  }

  static sendSentryError(erro: Error) {
    Sentry.captureException(erro);
  }
}
