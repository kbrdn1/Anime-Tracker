// Conrtroller for authentication - auth.controller.ts
import { Hono } from 'hono'
import { authService } from '@/services'
import User from '@/types/User.js'

class AuthController {
  routes = new Hono().basePath('/auth')

  public signIn = async () => {
    return this.routes.post('/signin', async c => {
      const body = await c.req.json()

      const token = await authService.login(body)
      return c.json({ token }, 200)
    })
  }

  public signUp = async () => {
    return this.routes.post('/signup', async c => {
      const body = await c.req.json<User>()
      await authService.register(body)

      return c.text('User registered', 201)
    })
  }

  public verify = async () => {
    return this.routes.get('/verify', async c => {
      const token = c.req.header('Authorization')?.split('Bearer ')[1]

      if (!token) return c.json('No token provided', 401)

      await authService.verify(token)

      return c.text('Token verified', 200)
    })
  }

  public router = () => {
    this.signIn()
    this.signUp()
    this.verify()

    return this.routes
  }
}

export default new AuthController()
