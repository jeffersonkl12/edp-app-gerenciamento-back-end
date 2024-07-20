class UserDetailsRegisterDTO {
  nome?: string
  email: string
  password: string

  constructor(email: string, password: string, nome?: string) {
    this.nome = this.nome
    this.email = email
    this.password = password
  }
}

export default UserDetailsRegisterDTO
