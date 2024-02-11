import { Hono } from 'hono'
import adminGuard from '@/middlewares/Admin.guard'

class DefaultController {
  protected static basePath: string = '/'
  protected static routes = new Hono().basePath(DefaultController.basePath)
  protected static service: any
  protected static guard: any
  protected static isProtected: boolean = false
  protected static adminGuard = adminGuard

  constructor(
    basePath: string,
    tableName: string,
    isProtected: boolean = false,
    guard: any = null
  ) {
    DefaultController.basePath = basePath
    DefaultController.service = import(`@/services/${tableName}.service`)
    DefaultController.isProtected = isProtected
    DefaultController.guard = guard
      ? import(`@/middlewares/${guard}.guard`)
      : null
  }

  public static async index() {
    this.routes.get('/', async c => {
      // TODO: Add AdminGuard
      // TODO: Add pagination
      return c.json(this.service.getAll())
    })
  }

  public static async show() {
    this.routes.get('/:id', async c => {
      // TODO: Add AdminGuard
      const { id } = c.req.param()

      const item = await this.service.get(Number(id))

      if (!item) return c.text('Item not found', 404)

      return c.json(item)
    })
  }

  public static async store() {
    this.routes.post('/', async c => {
      // TODO: Add AdminGuard
      const item = await this.service.create(c.req.parseBody())
      return c.json(item, 201)
    })
  }

  public static async update() {
    this.routes.patch('/:id', async c => {
      // TODO: Add AdminGuard
      const { id } = c.req.param()
      const item = await this.service.update(Number(id), c.req.parseBody())

      if (!item) return c.text('Item not found', 404)

      return c.json(item)
    })
  }

  public static async delete() {
    this.routes.delete('/:id', async c => {
      // TODO: Add AdminGuard
      const { id } = c.req.param()
      const item = await this.service.delete(Number(id))

      if (!item) return c.text('Item not found', 404)

      return c.json(item)
    })
  }
}
