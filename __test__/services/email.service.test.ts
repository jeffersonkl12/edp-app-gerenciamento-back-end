import { sendEmail } from '../../src/services/email.service'

describe('Testando servico de email', () => {
  test('Testando envio de email - valido', async () => {
    const contentConfig = {
      conteudo:
        'Olá este email e um secundario seu! espero que esteja funcionando.',
      remetente: 'edp@gmail.com',
      destinatario: 'jefferson@gmail.com',
      titulo: 'Testando nova config de menssagem',
    }

    await expect(sendEmail(contentConfig)).resolves.not.toThrow()
  })
})
