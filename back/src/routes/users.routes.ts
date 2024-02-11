// Routes for users - usersRoutes.ts
import { Hono } from 'hono'
import {
  getUsers,
  getUser,
  storeUser,
  updateUser,
  deleteUser,
} from '@/controllers/users.controller'
import type User from '@/types/User'

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

routes.post('/', async c => {
  const body = await c.req.json<User>()
  const user = await storeUser(body)

  return c.json('User created!', 201)
})

routes.patch('/:id', async c => {
  const { id } = c.req.param()
  const body = await c.req.json<User>()
  const user = await updateUser(Number(id), body)

  return c.json(user, 200)
})

routes.delete('/:id', async c => {
  const { id } = c.req.param()

  const user = await deleteUser(Number(id))

  return c.text('User deleted!', 204)
})
