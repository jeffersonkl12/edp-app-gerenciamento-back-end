import express, { NextFunction, Request, Response } from 'express'
import * as dotenv from 'dotenv'
import routerRegister from './routers/register.router'
import routerVerify from './routers/verify.router'
import routerLogin from './routers/login.router'
import routerLogout from './routers/logout.router'
import routerFogotPassword from './routers/forgot-password.router'
import routerResetPassword from './routers/reset-password.router'
import routerAthentication from './routers/authentication'
import ErrorFieldInvalid from './errors/error-field-invalid'
import ResponseErrorViolationField from './errors/response-error-violation-field.error'
import ResponseErrorBase from './errors/response-error-base.error'
import cors from 'cors'

dotenv.config()

const HOST = process.env.SERVER_HOST || 'localhost'
const PORT = process.env.SERVER_PORT || '8080'

const app = express()

app.use(cors())
app.use(express.json())

// public routers

app.use('/api/register', routerRegister)
app.use('/api/verify', routerVerify)
app.use('/api/login', routerLogin)
app.use('/api/logout', routerLogout)
app.use('/api/fogot-password', routerFogotPassword)
app.use('/api/reset-password', routerResetPassword)

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
