import jwt, { TokenExpiredError } from 'jsonwebtoken'
import fs from 'fs'
import * as dotenv from 'dotenv'
import { JWTCONFIG } from '../interfaces/global.interfaces'

dotenv.config()

const PATH_PRIVATE_KEY = process.env.PATH_TO_PRIVATE_KEY || ''
const PATH_PUBLIC_KEY = process.env.PATH_TO_PUBLIC_KEY || ''

export function createToken(config: JWTCONFIG, payload: any = {}) {
  const privateKey = readFileKey(PATH_PRIVATE_KEY)

  return jwt.sign(payload, privateKey, {
    algorithm: 'RS256',
    issuer: 'api_edp',
    ...config,
  })
}

export function verifyToken(token: string) {
  const publicKey = readFileKey(PATH_PUBLIC_KEY)
  try {
    jwt.verify(token, publicKey, { algorithms: ['RS256'], complete: true })
    return true
  } catch (err) {
    return false
  }
}

export function decodeToken(token: string) {
  return jwt.decode(token, { complete: true, json: true })
}

function verifyKeysIntegridate() {
  if (PATH_PRIVATE_KEY && PATH_PUBLIC_KEY) {
    if (fs.existsSync(PATH_PRIVATE_KEY) && fs.existsSync(PATH_PUBLIC_KEY)) {
      return
    }
  }

  throw new Error('Chaves RSA invalidas ou nao encontradas!')
}

export function readFileKey(path: string) {
  verifyKeysIntegridate()
  return fs.readFileSync(path, { encoding: 'utf-8' })
}
