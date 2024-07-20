import {
  TYPESTATUSUSER,
  TYPETOKEN,
} from '../../src/interfaces/global.interfaces'
import { createToken } from '../../src/services/token.service'
import { verifyActivateAccout } from '../../src/services/verify.service'
import * as userDetailsReposiotryf from '../../src/repositorys/userDetails.repository'

describe('Teste do servico de verificacao da conta', () => {
  beforeEach(() => {
    jest.clearAllMocks()
  })
  test('Teste de verificacao de conta - valido', async () => {
    const newUserDetails = {
      id: '1',
      nome: 'jefferson',
      email: 'jeffersonkl@gmail.com',
      status: TYPESTATUSUSER.DISABLED.toString(),
      password: '1234',
      createDate: new Date(),
      updateDate: new Date(),
    }

    const mockFindUserDetails = jest
      .spyOn(userDetailsReposiotryf, 'findUserDetailsById')
      .mockResolvedValue(newUserDetails)

    const mockSaveUserDetails = jest
      .spyOn(userDetailsReposiotryf, 'save')
      .mockResolvedValue({
        ...newUserDetails,
        status: TYPESTATUSUSER.ACTIVATE.toString(),
      })

    const token = createToken(
      { userId: '1', type: TYPETOKEN.ACTIVATION },
      { expiresIn: '1d', audience: '1' },
    )
    const userDetails = await verifyActivateAccout('1', token)

    const calls = mockFindUserDetails.mock.calls

    expect(calls[0][0]).toEqual('1')
    expect(userDetails?.status).toEqual(TYPESTATUSUSER.ACTIVATE.toString())
  })
})
