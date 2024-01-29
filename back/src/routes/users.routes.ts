// Routes for users - usersRoutes.ts
import { Hono } from 'hono'
import { getUsers, getUser } from '@/controllers/users.controller'

const routes = new Hono().basePath('/users')

routes.get('/', async c => {
  return c.json(await getUsers())
})

routes.get('/:id', async c => {
  const { id } = c.req.param()

  const user = await getUser(Number(id))

  if (!user) return c.text('User not found', 404)

  return c.json(user)
})

export default routes
