import jwt from 'jsonwebtoken'
import crypto from 'crypto'

interface JWTCONFIG {
  expiresIn?: string | number | undefined
  issuer?: string | undefined
  jwtid?: string | undefined
}

export function createToken(
  config: JWTCONFIG,
  payload: any,
  privateKey: string,
) {}
