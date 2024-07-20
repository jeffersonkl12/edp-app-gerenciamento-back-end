import { createToken, getFieldToToken, verifyToken } from './token.service'
import redisClient from '../databases/configs/redis.config'
import { TYPETOKEN } from '../interfaces/global.interfaces'
import { findUserDetailsById } from '../repositorys/userDetails.repository'

export async function handleChangeTokenRefresh(
  token: string,
  tokenRefresh: string,
) {
  try {
    verifyToken(tokenRefresh)

    const tokenRefreshId = getFieldToToken(tokenRefresh, 'jti')

    const tokenInheritanceRefreshId = getFieldToToken(token, 'tokenRefreshId')

    if (
      tokenInheritanceRefreshId &&
      tokenRefreshId &&
      tokenInheritanceRefreshId === tokenRefreshId
    ) {
      const isCacheTokenRefresh = await redisClient.sIsMember(
        'token:refresh',
        tokenRefreshId,
      )

      if (isCacheTokenRefresh) {
        throw new Error('Token refresh invalido!')
      }

      await redisClient.sAdd('token:refresh', tokenRefreshId)

      const userId = getFieldToToken(tokenRefresh, 'aud')
      const userDetails = await findUserDetailsById(userId)

      const newTokenRefresh = createToken(
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

      const newTokenRefreshId = getFieldToToken(newTokenRefresh, 'jti')

      const newToken = createToken(
        {
          email: userDetails.email,
          tokenRefreshId: newTokenRefreshId,
          type: TYPETOKEN.AUTHENTICATION,
        },
        {
          expiresIn: '10s',
          audience: userDetails.id,
          subject: 'token_authentication',
        },
      )

      return {
        token: newToken,
        tokenRefresh: newTokenRefresh,
      }
    }
  } catch (err) {
    throw err
  }
}
