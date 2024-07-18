import fs from 'fs'

export function readToParsherFile(path: string, key: string, content: string) {
  if (fs.existsSync(path)) {
    const file = fs.readFileSync(path).toString('utf-8')

    return file.replace(`{{${key}}}`, content)
  }

  throw new Error('Caminho ou arquivo invalido!')
}
