export default class DefaultError extends Error {
  public stack?: string;

  constructor(message: string, stack?: Error | unknown) {
    super(message);
    this.stack = this.verifyUnknownError(stack);
  }
  private verifyUnknownError(error: Error | unknown) {
    if (error instanceof Error) return error.stack;
  }
}
