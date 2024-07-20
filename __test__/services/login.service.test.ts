import userDetailsBaseDTO from '../../src/dtos/userDetails/userDetailsBase.dto'
import { v7 as uuidV7 } from 'uuid'
import * as userDetailsRepository from '../../src/repositorys/userDetails.repository'
import * as tokenService from '../../src/services/token.service'
import { TYPESTATUSUSER } from '../../src/interfaces/global.interfaces'
import { UserDetails } from '@prisma/client'
import { login } from '../../src/services/login.service'
import { hash } from '../../src/utils/has.utils'

describe('Testando servico de login', () => {
  const userDetails: userDetailsBaseDTO = {
    id: uuidV7(),
    nome: 'jefferson',
    email: 'jeffersonkl99@gmail.com',
    password: hash('senha'),
    status: TYPESTATUSUSER.ACTIVATE.toString(),
    createDate: new Date(),
    updateDate: new Date(),
  }

  jest
    .spyOn(userDetailsRepository, 'findByEmailAndPassword')
    .mockImplementation((email: string, password: string) => {
      return new Promise((resolve, reject) => {
        if (password === userDetails.password) {
          return resolve(userDetails as UserDetails)
        }

        return reject(new Error('Usuario inexistente!'))
      })
    })

  beforeEach(() => {
    jest.clearAllMocks()
  })

  test('Testando login - valido', async () => {
    const email = 'jeffersonkl99@gmail.com'
    const password = 'senha'

    const responseLogin = await login(email, password)

    await expect(login(email, password)).resolves.not.toThrow()
    expect(responseLogin.userDetails.id).toEqual(userDetails.id)
  })
  test('Testando login - invalido', async () => {
    const email = 'jeffersonkl99@gmail.com'
    const password = 'senha1'

    await expect(login(email, password)).rejects.toThrow()
  })
})
