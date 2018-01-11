export class MyError extends Error {
  constructor (message = 'Internal server error', status = 500) {
    super(message)
    this.status = status
  }
}
