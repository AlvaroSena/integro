export class StoreLimitExceededError extends Error {
  constructor() {
    super("Store limit exceeded");
  }
}
