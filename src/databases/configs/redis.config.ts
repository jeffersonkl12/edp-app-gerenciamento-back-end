import { createClient } from 'redis'
import * as dotenv from 'dotenv'

dotenv.config()

const URL = process.env.DATABASE_URL_REDIS || 'redis://127.0.0.1:6379'

const client = createClient({
  url: URL,
})

client.on('ready', () => console.log('Redis iniciado e connectado'))
client.on('error', err => console.log('Redis client error', err))

export default client
