import {
  JWTBody,
  ResponseUserCredential,
  TYPESTATUSUSER,
  TYPETOKEN,
} from '../interfaces/global.interfaces'
import { findByEmailAndPassword } from '../repositorys/userDetails.repository'
import { hash } from '../utils/has.utils'
import { createToken, decodeToken } from './token.service'

export async function login(email: string, password: string) {
  try {
    const userDetails = await findByEmailAndPassword(email, hash(password))
    if (userDetails.status === TYPESTATUSUSER.DISABLED.toString()) {
      throw new Error('Usuario nao ativado!')
    }
    const tokenRefresh = createToken(
      {
        email: userDetails.email,
        type: TYPETOKEN.REFRESH,
      },
      {
        expiresIn: '1m',
        audience: userDetails.id,
        subject: 'token_refresh',
      },
    )

    const tokenRefreshPayload = decodeToken(tokenRefresh)?.payload as JWTBody
    const tokenRefreshId = tokenRefreshPayload.jti

    const token = createToken(
      {
        email: userDetails.email,
        tokenRefreshId: tokenRefreshId,
        type: TYPETOKEN.AUTHENTICATION,
      },
      {
        expiresIn: '10s',
        audience: userDetails.id,
        subject: 'token_authentication',
      },
    )

    const responseUserCredential: ResponseUserCredential = {
      userDetails: userDetails,
      token: token,
      tokenRefresh: tokenRefresh,
    }

    return responseUserCredential
  } catch (err) {
    console.error(err)
    throw err
  }
}
