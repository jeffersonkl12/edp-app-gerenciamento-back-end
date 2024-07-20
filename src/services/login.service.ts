import {
  ResponseUserCredential,
  TYPETOKEN,
} from '../interfaces/global.interfaces'
import { findByEmailAndPassword } from '../repositorys/userDetails.repository'
import { hash } from '../utils/has.utils'
import { createToken } from './token.service'

export async function login(email: string, password: string) {
  try {
    const userDetails = await findByEmailAndPassword(email, hash(password))

    const token = createToken(
      { email: userDetails.email, type: TYPETOKEN.AUTHENTICATION },
      {
        expiresIn: '10s',
        audience: userDetails.id,
        subject: 'token_authentication',
      },
    )

    const tokenRefresh = createToken(
      { email: userDetails.email, type: TYPETOKEN.REFRESH },
      {
        expiresIn: '1m',
        audience: userDetails.id,
        subject: 'token_refresh',
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
