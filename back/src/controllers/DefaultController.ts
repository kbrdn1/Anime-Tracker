import { Hono } from 'hono'
// import adminGuard from '@/middlewares/admin.guard'

class DefaultController {
  protected basePath: string = '/'
  protected controllerName: string
  protected routes = new Hono().basePath(this.basePath)
  protected service: any
  protected guard: any
  protected isProtected: boolean = false
  // protected adminGuard = adminGuard

  constructor(
    basePath: string,
    name: string,
    isProtected: boolean = false,
    service: any,
    guard: any = null
  ) {
    this.controllerName = name
    this.routes = new Hono().basePath(basePath)
    this.basePath = basePath
    this.service = service
    this.guard = guard
    this.isProtected = isProtected
  }

  public index = async () => {
    return this.routes.get('/', async c => {
      console.log('this.service.getAll()', this.service.getAll())
      // TODO: Add AdminGuard
      return c.json(await this.service.getAll())
    })
  }

  public show = async () => {
    return this.routes.get('/:id', async c => {
      // TODO: Add AdminGuard
      const { id } = c.req.param()

      const item = await this.service.get(Number(id))

      if (!item) return c.text('Item not found', 404)

      return c.json(item)
    })
  }

  public store = async () => {
    return this.routes.post('/', async c => {
      // TODO: Add AdminGuard
      const body = await c.req.json()

      const item = await this.service.create(body)
      return c.json(item, 201)
    })
  }

  public update = async () => {
    return this.routes.patch('/:id', async c => {
      // TODO: Add AdminGuard
      const { id } = c.req.param()
      const body = await c.req.json()

      const item = await this.service.update(Number(id), body)

      if (!item) return c.text('Item not found', 404)

      return c.json(item)
    })
  }

  public delete = async () => {
    return this.routes.delete('/:id', async c => {
      // TODO: Add AdminGuard
      const { id } = c.req.param()
      const item = await this.service.delete(Number(id))

      if (!item) return c.text('Item not found', 404)

      return c.json(item)
    })
  }

  public router = () => {
    this.index()
    this.show()
    this.store()
    this.update()
    this.delete()

    return this.routes
  }
}

export default DefaultController
