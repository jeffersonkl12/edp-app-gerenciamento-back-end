const emailRegx = /.*@[a-zA-Z0-9]\.*/
const emailDominioRegx = /.*@Edp.com.br$/

const DEV = process.env.NODE_ENV === 'development' ? true : false

export function validEmailCliente(email: string) {
  return emailRegx.test(email)
}

export function validEmailDominio(email: string) {
  return DEV ? true : emailDominioRegx.test(email)
}
