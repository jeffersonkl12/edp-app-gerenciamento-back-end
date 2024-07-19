import { createClient } from 'redis'

const client = createClient({
  url: 'redis://127.0.0.1:6379',
})

client.on('ready', () => console.log('Redis iniciado e connectado'))
client.on('error', err => console.log('Redis client error', err))

export default client
