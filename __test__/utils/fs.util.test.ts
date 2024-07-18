import { existsSync, readFileSync } from 'fs'
import { readToParsherFile } from '../../src/utils/fs.utils'

jest.mock('fs')

beforeAll(() => {
  jest.resetAllMocks()
})

describe('Teste de utilidades de manipulacao de arquivos', () => {
  test('Teste de substituicao de conteudo', () => {
    const html = String.raw`
      <html> 
      <body>
        <p>este conteudo foi substituido</p>
        <p>{{conteudo}}</p>
      </body>
      </html>
    `

    ;(existsSync as jest.Mock).mockReturnValue(true)
    ;(readFileSync as jest.Mock).mockReturnValue(html)

    expect(
      readToParsherFile('./arquivo', 'conteudo', 'ola! meu nome é jefferson'),
    ).toBe(`
      <html> 
      <body>
        <p>este conteudo foi substituido</p>
        <p>ola! meu nome é jefferson</p>
      </body>
      </html>
    `)
  })
})
