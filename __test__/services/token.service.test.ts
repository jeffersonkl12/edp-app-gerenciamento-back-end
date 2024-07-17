import { expect, test, describe } from '@jest/globals'
import { createToken } from '../../src/services/token.service'

describe('Testando servicos de token', () => {
  test('Test criacao de token - valido', () => {
    const privateKey = 'meusegredo'
    const pessoa = {
      nome: 'jefferson',
      idadE: 25,
    }

    expect(createToken({}, JSON.stringify(pessoa), privateKey)).not.toBeNull()
  })
})
