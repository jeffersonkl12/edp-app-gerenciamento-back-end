import redisClient from '../databases/configs/redis.config'
import { JWTBody, TYPETOKEN } from '../interfaces/global.interfaces'
import { decodeToken, getFieldToToken, verifyToken } from './token.service'

export async function logout(tokenRefresh: string) {
  try {
    verifyToken(tokenRefresh)
    const tokenRefreshDecode = decodeToken(tokenRefresh)

    if (tokenRefreshDecode) {
      const typeToken = (tokenRefreshDecode.payload as JWTBody).type

      if (TYPETOKEN.REFRESH === typeToken) {
        const tokenRefreshId = getFieldToToken(tokenRefresh, 'jti')

        await redisClient.SET(tokenRefreshId as string, tokenRefresh, {
          EX: 60 * 60 * 24,
        })
      }
    }
  } catch (err) {
    throw err
  }
}
