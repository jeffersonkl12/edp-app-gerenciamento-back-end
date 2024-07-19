import UserDetailsRegisterDTO from '../../src/dtos/userDetails/userDetails.dto'
import { v7 as uuidV7 } from 'uuid'
import { registerUser } from '../../src/services/register.service'

jest.mock('../../src/repositorys/userDetails.repository', () => ({
  __esModule: true,
  save: jest.fn().mockImplementation(newUser => ({
    id: uuidV7(),
    ...newUser,
    nome: 'jefferson',
    createDate: new Date(),
    updateDate: new Date(),
  })),

  existByEmail: jest.fn().mockReturnValue(false),
}))

jest.mock('../../src/services/email.service', () => ({
  sendEmail: jest.fn().mockReturnValue({ response: 'ENVINHADO' }),
}))

beforeEach(() => {
  jest.clearAllMocks()
})

describe('Teste de servico do registro de usuario', () => {
  test('Test de registro de novo usuario - valido', async () => {
    const userDetailsDTO = new UserDetailsRegisterDTO(
      'jeffersonkl99@gmail.com',
      uuidV7(),
    )

    await expect(registerUser(userDetailsDTO)).resolves.toEqual('ENVINHADO')
  })
})
