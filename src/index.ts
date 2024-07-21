import express, { NextFunction, Request, Response } from 'express'
import * as dotenv from 'dotenv'
import routerRegister from './routers/register.router'
import routerVerify from './routers/verify.router'
import routerLogin from './routers/login.router'
import ErrorFieldInvalid from './errors/error-field-invalid'
import ResponseErrorViolationField from './errors/response-error-violation-field.error'
import ResponseErrorBase from './errors/response-error-base.error'

dotenv.config()

const HOST = process.env.SERVER_HOST || 'localhost'
const PORT = process.env.SERVER_PORT || '8080'

const app = express()

app.use(express.json())

app.use('/api/register', routerRegister)
app.use('/api/verify', routerVerify)
app.use('/api/login', routerLogin)

app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
  console.error(err.stack)
  let responseError
  if (err instanceof ErrorFieldInvalid) {
    responseError = new ResponseErrorViolationField(
      400,
      err.message,
      new Date(),
      err.fields,
    )
  } else {
    responseError = new ResponseErrorBase(500, err.message, new Date())
  }
  res.status(responseError.code || 500).json(responseError)
})

if (process.env.NODE_ENV !== 'test') {
  app.listen(parseInt(PORT), HOST, () => {
    console.log('Servidor iniciado!')
  })
}

export default app
