import { Server, env } from 'bun'
import { Hono } from 'hono'
import { cors } from 'hono/cors'
import { csrf } from 'hono/csrf'
import { secureHeaders } from 'hono/secure-headers'
import { logger } from 'hono/logger'
import { securityGuard, brutForceGuard } from './middlewares'
import {
  authController,
  usersController,
  authorsController,
  gendersController,
  statusesController,
  studiosController,
  animeTypesController,
  themesController,
  episodesController,
  seasonsController,
  animesController
} from './controllers'

const api = new Hono().basePath('/api/v1')

api.use(cors())
api.use(csrf())
api.use(secureHeaders())
api.use(logger())
api.use(brutForceGuard)
api.use('/*', securityGuard)

api.get('/', c => {
  return c.text('Hello form Anime Tracker API !')
})

api.route('', authController.router())
api.route('', usersController.router())
api.route('', authorsController.router())
api.route('', gendersController.router())
api.route('', statusesController.router())
api.route('', studiosController.router())
api.route('', animeTypesController.router())
api.route('', themesController.router())
api.route('', episodesController.router())
api.route('', seasonsController.router())
api.route('', animesController.router())

export default {
  port: env.PORT,
  fetch(this, request: Request, server: Server) {
    const ip = server.requestIP(request)
    return api.fetch(request, { ip })
  },
}
