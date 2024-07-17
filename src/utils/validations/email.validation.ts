const emailRegx = /.*@[a-zA-Z0-9]\.*/
const emailDominioRegx = /.*@gmail.com$/

export function validEmailCliente(email: string) {
  return emailRegx.test(email)
}

export function validEmailDominio(email: string) {
  return emailDominioRegx.test(email)
}
