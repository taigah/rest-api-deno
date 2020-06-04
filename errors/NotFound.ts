import { AppError } from './AppError.ts'

export class NotFound extends AppError {
  constructor (message: string = 'Document not found') {
    super(404, message)
  }
}
