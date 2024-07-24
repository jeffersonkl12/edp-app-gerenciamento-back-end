import HttpError from '../errors/exceptions/htto-error.error'
import { TYPETOKEN } from '../interfaces/global.interfaces'
import { getFieldToToken, verifyToken } from './token.service'

export async function authentication(token: string) {
  try {
    verifyToken(token)
    const tokenType = getFieldToToken(token, 'type')

    if (!tokenType || tokenType !== TYPETOKEN.AUTHENTICATION) {
      throw new Error('Token invalido!')
    }
  } catch (err) {
    if (err instanceof Error) {
      throw new HttpError(err.message, 401, 'Credenciais invalidas')
    }
  }
}

export default authentication
