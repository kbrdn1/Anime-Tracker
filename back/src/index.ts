import { Hono } from 'hono'
import {
  authController,
  usersController,
  authorsController,
  gendersController,
} from './controllers'

const api = new Hono().basePath('/api/v1')

api.get('/', c => {
  return c.text('Hello form Anime Tracker API !')
})

api.route('', usersController.router())
api.route('', authController.router())
api.route('', authorsController.router())
api.route('', gendersController.router())

export default api
