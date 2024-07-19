import cliente from '../../src/databases/configs/redis.config'

describe('Testando configuracoes do redis', () => {
  test('Testando conneccao do redis', async () => {
    await expect(cliente.connect()).resolves.not.toThrow()

    const timeout = (ms: number) => {
      return new Promise(resolve => setTimeout(resolve, ms))
    }

    await timeout(1000 * 3)

    await expect(cliente.quit()).resolves.toEqual('OK')
  })
})
