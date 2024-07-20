import { createHash } from 'crypto'

export function hash(content: string) {
  return createHash('sha256').update(content).digest('hex')
}
