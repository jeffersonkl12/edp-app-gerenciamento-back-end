import jwt from 'jsonwebtoken'
import fs from 'fs'
import * as dotenv from 'dotenv'

dotenv.config()

const PATH_PRIVATE_KEY = process.env.PATH_TO_PRIVATE_KEY || ''
const PATH_PUBLIC_KEY = process.env.PATH_TO_PUBLIC_KEY || ''

interface JWTCONFIG {
  expiresIn?: string | number | undefined
  issuer?: string | undefined
  jwtid?: string | undefined
}

export function createToken(config: JWTCONFIG, payload: any) {
  const encodePayload = JSON.stringify(payload)

  const privateKey = readFileKey(PATH_PRIVATE_KEY)

  return jwt.sign(encodePayload, privateKey, { algorithm: 'RS256' })
}

export function verifyToken(token: string) {
  const publicKey = readFileKey(PATH_PUBLIC_KEY)
  try {
    jwt.verify(token, publicKey, { algorithms: ['RS256'], complete: true })
  } catch (err) {
    throw new Error('Token invalido!')
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

function readFileKey(path: string) {
  verifyKeysIntegridate()
  return fs.readFileSync(path, { encoding: 'utf-8' })
}
