import { describe, expect, test } from '@jest/globals'
import {
  validEmailCliente,
  validEmailDominio,
} from '../../src/utils/validations/email.validation'

describe('Testando validacao de email', () => {
  test('Teste de email - valido', () => {
    const emailTest = 'jeffersonkl99@gmail.com'

    expect(validEmailCliente(emailTest)).toEqual(true)
  })
  test('Teste de email - invalido', () => {
    const emailTest = 'jeffersonkl99@.com'

    expect(validEmailCliente(emailTest)).toEqual(false)
  })
  test('Teste dominio de email - valido', () => {
    const emailTest = 'jeffersonkl99@Edp.com.br'

    expect(validEmailDominio(emailTest)).toEqual(true)
  })
  test('Teste de dominio de email - invalido', () => {
    const emailTest = 'jeffersonkl99@outlook.com'

    expect(validEmailDominio(emailTest)).toEqual(false)
  })
})
