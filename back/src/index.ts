import { Hono } from 'hono'

const app = new Hono()

app.get('/', (c) => {
  return c.text('Hello form Anime Tracker API !')
})

export default app
