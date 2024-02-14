import { Hono } from 'hono'
import users from '@/controllers/users.controller'

const api = new Hono().basePath('/api')

api.get('/', c => {
  return c.text('Hello form Anime Tracker API !')
})

api.route('', users.router())

export default api
