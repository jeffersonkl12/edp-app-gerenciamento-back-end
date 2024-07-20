import jwt, { TokenExpiredError } from 'jsonwebtoken'
import fs from 'fs'
import * as dotenv from 'dotenv'
import { JWTBody, JWTConfig, TYPETOKEN } from '../interfaces/global.interfaces'
import { v7 as uuidV7 } from 'uuid'

dotenv.config()

const PATH_PRIVATE_KEY = process.env.PATH_TO_PRIVATE_KEY || ''
const PATH_PUBLIC_KEY = process.env.PATH_TO_PUBLIC_KEY || ''

export function createToken(
  payload: JWTBody = { type: TYPETOKEN.ACTIVATION },
  JWTConfig?: JWTConfig,
) {
  const privateKey = readFileKey(PATH_PRIVATE_KEY)

  return jwt.sign(payload, privateKey, {
    algorithm: 'RS256',
    issuer: 'api_edp',
    jwtid: uuidV7(),
    ...JWTConfig,
  })
}

export function verifyToken(token: string) {
  const publicKey = readFileKey(PATH_PUBLIC_KEY)
  try {
    jwt.verify(token, publicKey, { algorithms: ['RS256'], complete: true })
  } catch (err) {
    if (err instanceof TokenExpiredError) {
      throw new Error('Token expirado!')
    }
    throw err
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

export function getFieldToToken(token: string, field: string) {
  try {
    const tokenDecode = decodeToken(token)

    if (tokenDecode && tokenDecode.payload) {
      const tokenPayload = tokenDecode.payload as JWTBody

      if (tokenPayload[field]) {
        return tokenPayload[field]
      }
    }

    return null
  } catch (err) {
    throw err
  }
}
