import { ValidationError } from 'express-validator'
import ResponseErrorBase from './response-error-base.error'

class ResponseErrorViolationField extends ResponseErrorBase {
  fields?: ValidationError[]

  constructor(
    code?: number,
    message?: string,
    date?: Date,
    fields?: ValidationError[],
  ) {
    super(code, message, date)

    this.fields = fields
  }
}

export default ResponseErrorViolationField
