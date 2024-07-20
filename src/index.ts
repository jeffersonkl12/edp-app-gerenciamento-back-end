import express from 'express'
import * as dotenv from 'dotenv'
import routerRegister from './routers/register.router'
import routerVerify from './routers/verify.router'
import routerLogin from './routers/login.router'

dotenv.config()

const HOST = process.env.SERVER_HOST || 'localhost'
const PORT = process.env.SERVER_PORT || '8080'

const app = express()

app.use(express.json())

app.use('/api/register', routerRegister)
app.use('/api/verify', routerVerify)
app.use('/api/login', routerLogin)

if (process.env.NODE_ENV !== 'test') {
  app.listen(parseInt(PORT), HOST, () => {
    console.log('Servidor iniciado!')
  })
}

export default app
