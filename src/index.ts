import express, { NextFunction, Request, Response } from 'express'
import * as dotenv from 'dotenv'
import routerRegister from './routers/register.router'
import routerVerify from './routers/verify.router'
import routerLogin from './routers/login.router'
import routerLogout from './routers/logout.router'
import routerFogotPassword from './routers/forgot-password.router'
import routerResetPassword from './routers/reset-password.router'
import routerRefreshToken from './routers/refresh.router'
import routerAthentication from './routers/authentication'
import ErrorFieldInvalid from './errors/error-field-invalid'
import ResponseErrorViolationField from './errors/response-error-violation-field.error'
import ResponseErrorBase from './errors/response-error-base.error'
import cors from 'cors'
import redisClient from './databases/configs/redis.config'
import prismaClient from './databases/configs/prisma.config'
import HttpError from './errors/exceptions/htto-error.error'

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
app.use('/api/refresh-token', routerRefreshToken)
app.use('/api/fogot-password', routerFogotPassword)
app.use('/api/reset-password', routerResetPassword)

//private routers

app.use('/api/teste-private', routerAthentication, (req, res, next) => {
  console.log('esta logado!')

  return res.send('Você tme autorização1')
})

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
  } else if (err instanceof HttpError) {
    responseError = new ResponseErrorBase(err.code, err.info, new Date())
  } else {
    responseError = new ResponseErrorBase(500, err.message, new Date())
  }
  res.status(responseError.code || 500).json(responseError)
})

if (process.env.NODE_ENV !== 'test') {
  app.listen(parseInt(PORT), HOST, async () => {
    try {
      await redisClient.connect()
      await prismaClient.$connect()
      console.log('Servidor iniciado!')
    } catch (err) {
      console.log(err)
    }
  })
}

export default app
