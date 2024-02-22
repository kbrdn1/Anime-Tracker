// Default controller for all models - DefaultController.ts
import { Hono } from 'hono'
import Paginator from '@/components/Paginator'
import { adminGuard } from '@/middlewares'
import { HTTPException } from 'hono/http-exception'
import { User } from '@/types'

class DefaultController {
  protected basePath: string = '/'
  protected isProtected: boolean = false
  protected routes = new Hono().basePath(this.basePath)
  protected service: any
  protected adminGuard = adminGuard

  constructor(basePath: string, service: any, isProtected: boolean = false) {
    this.basePath = basePath
    this.isProtected = isProtected
    this.routes = new Hono().basePath(this.basePath)
    this.service = service
  }

  private protect = async () => {
    return this.routes.use('/*', async (c, next) => {
      if (!this.isProtected) return await next()
      else {
        const token = c.req.header('Authorization')

        if (!token) throw new HTTPException(401, { message: 'Invalid token' })

        this.adminGuard(token)

        return await next()
      }
    })
  }

  public index = async () => {
    return this.routes.get('/', async c => {
      const url = c.req.url

      return c.json(await Paginator(c.req.query(), this.service, url))
    })
  }

  public show = async () => {
    return this.routes.get('/:id', async c => {
      const { id } = c.req.param()

      const item = await this.service.get(Number(id))

      if (!item) return c.text('Item not found', 404)

      return c.json(item)
    })
  }

  public store = async () => {
    return this.routes.post('/', async c => {
      const body = await c.req.json()

      const item = await this.service.create(body)

      return c.json(item, 201)
    })
  }

  public update = async () => {
    return this.routes.put('/:id', async c => {
      const { id } = c.req.param()
      const body = await c.req.json()

      const item = await this.service.update(Number(id), body)

      if (!item) return c.text('Item not found', 404)

      return c.json(item)
    })
  }

  public destroy = async () => {
    return this.routes.delete('/:id', async c => {
      const { id } = c.req.param()
      const item = await this.service.destroy(Number(id))

      if (!item) return c.text('Item not found', 404)

      return c.json(item)
    })
  }

  public router = () => {
    this.protect()
    this.index()
    this.show()
    this.store()
    this.update()
    this.destroy()

    return this.routes
  }
}

export default DefaultController
