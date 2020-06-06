import { AppError } from './AppError.ts'

export class BadInput extends AppError {
  constructor (message: string = `Bad input`) {
    super(400, message)
  }
}
