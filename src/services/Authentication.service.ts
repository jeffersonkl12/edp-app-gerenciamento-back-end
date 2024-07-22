import { verifyToken } from './token.service'

export async function authentication(token: string) {
  try {
    verifyToken(token)
  } catch (err) {
    throw err
  }
}

export default authentication
