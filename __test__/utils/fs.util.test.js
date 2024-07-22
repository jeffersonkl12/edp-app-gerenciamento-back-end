"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const fs_1 = require("fs");
const fs_utils_1 = require("../../src/utils/fs.utils");
jest.mock('fs');
beforeAll(() => {
    jest.resetAllMocks();
});
describe('Teste de utilidades de manipulacao de arquivos', () => {
    test('Teste de substituicao de conteudo', () => {
        const html = String.raw `
      <html> 
      <body>
        <p>este conteudo foi substituido</p>
        <p>{{conteudo}}</p>
      </body>
      </html>
    `;
        fs_1.existsSync.mockReturnValue(true);
        fs_1.readFileSync.mockReturnValue(html);
        expect((0, fs_utils_1.readToParsherFile)('./arquivo', 'conteudo', 'ola! meu nome é jefferson')).toBe(`
      <html> 
      <body>
        <p>este conteudo foi substituido</p>
        <p>ola! meu nome é jefferson</p>
      </body>
      </html>
    `);
    });
});
