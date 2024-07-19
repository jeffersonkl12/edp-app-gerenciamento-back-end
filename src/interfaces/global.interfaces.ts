export interface UserCredential {
  nome?: string
  email: string
  password: string
}

export interface JWTCONFIG {
  expiresIn?: string | number | undefined
  subject?: string | undefined
  audience?: string | string[] | undefined
  jwtid?: string | undefined
}
