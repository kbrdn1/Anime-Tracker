import { Hono } from 'hono'
import routes from '@/routes'

const api = new Hono().basePath('/api')

api.get('/', c => {
  return c.text('Hello form Anime Tracker API !')
})

api.route('', routes.users)

export default api
