class UserDetailsUpdateDTO {
  nome?: string | null
  email?: string
  password?: string
  status?: string
  createDate?: Date
  updateDate?: Date

  constructor(
    email: string,
    password: string,
    status?: string,
    createDate?: Date,
    updateDate?: Date,
    nome?: string,
  ) {
    this.nome = nome
    this.email = email
    this.password = password
    this.status = status
    this.createDate = createDate
    this.updateDate = updateDate
  }
}

export default UserDetailsUpdateDTO
