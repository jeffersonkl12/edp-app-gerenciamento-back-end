import { JWTCONFIG } from '../../src/interfaces/global.interfaces'
import { v7 as uuidV7 } from 'uuid'
import {
  createToken,
  verifyToken,
  decodeToken,
} from '../../src/services/token.service'
import * as tokenService from '../../src/services/token.service'

describe('Teste de servico token', () => {
  test('Teste de criacao de token - valido', () => {
    const tokenConfig: JWTCONFIG = {
      jwtid: uuidV7(),
      subject: 'teste_criacao',
      audience: 'eu',
      expiresIn: '60s',
    }

    jest.spyOn(tokenService, 'readFileKey').mockReturnValue('senha1234')

    expect(
      createToken(tokenConfig, { email: 'jeffersonkl99@gmail.com' }),
    ).not.toBeNull()
  })

  test('Teste de verificacao do token - valido', () => {
    const tokenConfig: JWTCONFIG = {
      jwtid: uuidV7(),
      subject: 'teste_criacao',
      audience: 'eu',
      expiresIn: '60s',
    }

    const token = createToken(tokenConfig)

    expect(verifyToken(token)).toEqual(true)
  })

  test(
    'Test de verificacao do token - invalido',
    async () => {
      const tokenConfig: JWTCONFIG = {
        jwtid: uuidV7(),
        subject: 'teste_criacao',
        audience: 'eu',
        expiresIn: '1s',
      }

      const token = createToken(tokenConfig)

      const timeout = (ms: number) => {
        return new Promise(resolve => setTimeout(resolve, ms))
      }

      await timeout(1000 * 5)

      expect(verifyToken(token)).toEqual(false)
    },
    1000 * 10,
  )
  test('Teste de decodificacao do token - valido', () => {
    const tokenConfig: JWTCONFIG = {
      jwtid: uuidV7(),
      subject: 'teste_criacao',
      audience: 'eu',
      expiresIn: '60s',
    }

    const token = createToken(tokenConfig)

    expect(decodeToken(token)).not.toBeNull()
  })
})
