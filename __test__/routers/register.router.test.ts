import request from 'supertest'
import app from '../../src/index'
import { UserCredential } from '../../src/interfaces/global.interfaces'

jest.mock('../../src/services/register.service', () => ({
  registerUser: jest.fn().mockReturnValue(true),
}))

describe('Teste da rota de registro de usuario', () => {
  test('Testando validacao de registro de usuario - valido', async () => {
    const userCrendential: UserCredential = {
      nome: 'jefferson',
      email: 'jeffersonkl@Edp.com.br',
      password: '123456',
    }
    const response = await request(app)
      .post('/api/register/')
      .send(userCrendential)
      .set('Accept', 'application/json')
      .set('Content-Type', 'application/json')

    expect(response.status).toEqual(201)
    expect(response.body).toEqual('Cadastro realizado com sucesso!')
  })

  test('Testando validacao de registro de usuario - invalido', async () => {
    const userCrendential: UserCredential = {
      nome: 'jefferson',
      email: 'jeffersonkl',
      password: '123456',
    }
    const response = await request(app)
      .post('/api/register/')
      .send(userCrendential)
      .set('Accept', 'application/json')
      .set('Content-Type', 'application/json')

    expect(response.status).toEqual(400)
    expect(response.body[0].msg).toEqual('Nao e um email valido!')
  })
})
