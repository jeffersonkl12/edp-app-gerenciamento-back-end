class UserDetailsInfoDTO {
  id?: string
  nome?: string | null
  email: string
  constructor(email: string, id?: string, nome?: string) {
    this.id = id
    this.nome = nome
    this.email = email
  }
}

export default UserDetailsInfoDTO
