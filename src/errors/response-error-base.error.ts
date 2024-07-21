class ResponseErrorBase {
  code?: number
  message?: string
  date?: Date

  constructor(code?: number, message?: string, date?: Date) {
    this.code = code
    this.message = message
    this.date = date
  }
}

export default ResponseErrorBase
