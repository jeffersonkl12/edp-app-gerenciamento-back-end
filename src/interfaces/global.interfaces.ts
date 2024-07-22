import { UserDetails } from '@prisma/client'
import { JwtPayload, SignOptions } from 'jsonwebtoken'

export interface UserCredential {
  nome?: string
  email: string
  password: string
}

export interface JWTBody extends JwtPayload {
  userId?: string | null
  email?: string | null
  tokenRefreshId?: string | null
  type?: TYPETOKEN
}

export interface JWTConfig extends SignOptions {}

export enum TYPETOKEN {
  ACTIVATION = 'ACTIVATION',
  AUTHENTICATION = 'AUTHENTICATION',
  RESETTOKEN = 'RESETTOKEN',
  REFRESH = 'REFRESH',
  RECOVERY = 'RECOVERY',
  RESETPASSWORD = 'RESETPASSWORD',
}

export enum TYPESTATUSUSER {
  DISABLED = 'DISABLED',
  ACTIVATE = 'ACTIVATE',
}

export interface ResponseUserCredential {
  userDetails: UserDetails
  token: string
  tokenRefresh: string
}
