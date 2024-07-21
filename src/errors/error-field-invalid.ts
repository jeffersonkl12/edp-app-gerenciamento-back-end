import { ValidationError } from 'express-validator'

class ErrorFieldInvalid extends Error {
  fields?: ValidationError[]

  constructor(message?: string, fields?: ValidationError[]) {
    super(message)
    this.fields = fields
  }
}

export default ErrorFieldInvalid
