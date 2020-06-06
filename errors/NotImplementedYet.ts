import { AppError } from './AppError.ts'

export class NotImplementedYet extends AppError {
  constructor () {
    super(501, `Not implemented yet`)
  }
}
