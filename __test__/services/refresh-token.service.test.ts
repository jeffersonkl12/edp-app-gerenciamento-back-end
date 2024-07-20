import { login } from '../../src/services/login.service'
import * as userDetailsRepository from '../../src/repositorys/userDetails.repository'
import userDetailsBaseDTO from '../../src/dtos/userDetails/userDetailsBase.dto'
import { v7 as uuidV7 } from 'uuid'
import { TYPESTATUSUSER } from '../../src/interfaces/global.interfaces'
import { UserDetails } from '@prisma/client'
import { handleChangeTokenRefresh } from '../../src/services/refresh-token.service'
import { hash } from '../../src/utils/has.utils'

jest.mock('../../src/databases/configs/redis.config', () => ({
  sIsMember: jest.fn().mockReturnValue(false),
  sAdd: jest.fn().mockReturnValue(null),
}))

describe('Testes de troca de token', () => {
  const userDetails: userDetailsBaseDTO = {
    id: '1',
    nome: 'jefferson',
    email: 'jeffersonkl@gmail.com',
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

  jest
    .spyOn(userDetailsRepository, 'findUserDetailsById')
    .mockImplementation((id: string) => {
      return new Promise((resolve, reject) => {
        if (id === userDetails.id) {
          return resolve(userDetails as UserDetails)
        }

        return reject(new Error('Usuario inexistente!'))
      })
    })

  beforeEach(() => {
    jest.clearAllMocks()
  })
  test('Teste de refresh de token - valido', async () => {
    const email = 'jeffersonkl@gmail.com'
    const password = 'senha'

    const userCredentials = await login(email, password)

    const { token, tokenRefresh } = userCredentials

    const newsCredential = await handleChangeTokenRefresh(token, tokenRefresh)

    const { token: newToken, tokenRefresh: newTokenRefresh } = newsCredential!

    await expect(
      handleChangeTokenRefresh(
        userCredentials.token,
        userCredentials.tokenRefresh,
      ),
    ).resolves.not.toThrow()
    expect(token).not.toEqual(newToken)
    expect(tokenRefresh).not.toEqual(newTokenRefresh)
  })
})
