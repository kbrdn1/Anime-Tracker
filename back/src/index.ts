import { Hono } from 'hono'
import { authController, usersController } from './controllers'

const api = new Hono().basePath('/api/v1')

api.get('/', c => {
  return c.text('Hello form Anime Tracker API !')
})

api.route('', usersController.router())
api.route('', authController.router())

export default api
