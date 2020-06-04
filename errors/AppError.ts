export class AppError extends Error {
  status: number
  message: string
  meta: object

  constructor (status: number, message: string, meta?: object) {
    super(message)
    this.message = message
    this.status = status
    this.meta = meta ?? {}
  }
}
