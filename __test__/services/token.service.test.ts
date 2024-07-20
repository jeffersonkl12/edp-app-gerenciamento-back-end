import {
  JWTBody,
  JWTConfig,
  TYPETOKEN,
} from '../../src/interfaces/global.interfaces'
import { v7 as uuidV7 } from 'uuid'
import {
  createToken,
  verifyToken,
  decodeToken,
  getFieldToToken,
} from '../../src/services/token.service'
import * as tokenService from '../../src/services/token.service'

describe('Teste de servico token', () => {
  test('Teste de criacao de token - valido', () => {
    const tokenBody: JWTBody = {
      jwtid: uuidV7(),
      subject: 'teste_criacao',
      audience: 'eu',
      expiresIn: '60s',
      email: 'jeffersonkl99@gmail.com',
    }

    jest.spyOn(tokenService, 'readFileKey').mockReturnValue('senha1234')

    expect(createToken(tokenBody)).not.toBeNull()
  })

  test('Teste de verificacao do token - valido', () => {
    const tokenBody: JWTBody = {
      jwtid: uuidV7(),
      subject: 'teste_criacao',
      audience: 'eu',
      expiresIn: '60s',
      email: 'jeffersonkl99@gmail.com',
    }
    const token = createToken(tokenBody)

    expect(() => verifyToken(token)).not.toThrow()
  })

  test(
    'Test de verificacao do token - invalido',
    async () => {
      const tokenBody: JWTBody = {
        email: 'jeffersonkl99@gmail.com',
      }

      const tokenConfig: JWTConfig = {
        subject: 'teste_criacao',
        audience: 'eu',
        expiresIn: '1s',
      }

      const token = createToken(tokenBody, tokenConfig)

      const timeout = (ms: number) => {
        return new Promise(resolve => setTimeout(resolve, ms))
      }

      await timeout(1000 * 5)

      expect(() => verifyToken(token)).toThrow()
    },
    1000 * 10,
  )
  test('Teste de decodificacao do token - valido', () => {
    const tokenBody: JWTBody = {
      jwtid: uuidV7(),
      subject: 'teste_criacao',
      audience: 'eu',
      expiresIn: '60s',
      email: 'jeffersonkl99@gmail.com',
    }

    const token = createToken(tokenBody)

    expect(decodeToken(token)).not.toBeNull()
  })

  test('Testando reucperacao de vlaor de campo especifico', () => {
    const token = createToken(
      {
        email: 'jeffersonkl@gmail.com',
        type: TYPETOKEN.AUTHENTICATION,
        userId: '1',
      },
      {
        audience: '1',
        expiresIn: '1s',
      },
    )

    expect(getFieldToToken(token, 'email')).toEqual('jeffersonkl@gmail.com')
    expect(getFieldToToken(token, 'aud')).toEqual('1')
    expect(getFieldToToken(token, 'salario')).toBeNull()
  })
})
