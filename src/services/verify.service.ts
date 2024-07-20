import { decodeToken, verifyToken } from './token.service'
import {
  JWTBody,
  TYPESTATUSUSER,
  TYPETOKEN,
} from '../interfaces/global.interfaces'
import * as userDetailsRepository from '../repositorys/userDetails.repository'

export async function verifyActivateAccout(userId: string, token: string) {
  try {
    verifyToken(token)
    const userDetails = await userDetailsRepository.findUserDetailsById(userId)
    const tokenDecode = decodeToken(token)

    if (tokenDecode) {
      const { payload } = tokenDecode
      let tokenBody: JWTBody

      if (typeof payload === 'string') {
        tokenBody = JSON.parse(payload)
      } else {
        tokenBody = payload
      }

      if (
        userDetails.id === tokenBody.aud &&
        tokenBody.type === TYPETOKEN.ACTIVATION &&
        userDetails.status === TYPESTATUSUSER.DISABLED.toString()
      ) {
        userDetails.status = TYPESTATUSUSER.ACTIVATE.toString()
        return userDetailsRepository.save(userDetails)
      }
    }
  } catch (err) {
    console.error(err)
    throw err
  }
}
