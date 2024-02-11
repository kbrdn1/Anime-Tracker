import { Hono } from 'hono'
import adminGuard from '@/middlewares/admin.guard'

class DefaultController {
  protected static basePath: string = '/'
  protected static controllerName: string
  protected static routes = new Hono().basePath(DefaultController.basePath)
  protected static service: any
  protected static guard: any
  protected static isProtected: boolean = false
  protected static adminGuard = adminGuard
  protected static type: any

  constructor(
    basePath: string,
    controllerName: string,
    isProtected: boolean = false,
    guard: any = null
  ) {
    DefaultController.controllerName = controllerName
    DefaultController.routes = new Hono().basePath(basePath)
    DefaultController.basePath = basePath
    DefaultController.service = import(`@/services/${controllerName}.service`)
    DefaultController.isProtected = isProtected
    DefaultController.guard = guard
      ? import(`@/middlewares/${guard}.guard`)
      : null
    DefaultController.type = this.findItemType()
  }

  private findItemType() {
    let type = DefaultController.controllerName.charAt(0).toUpperCase()
    if (type.charAt(length - 1) === 's') type = type.slice(0, -1)

    return import(`@/types/${type}.d.ts`)
  }

  private static verifyType(element: any): boolean {
    return typeof element === typeof this.type() ? true : false
  }

  public static async index() {
    this.routes.get('/', async c => {
      // TODO: Add AdminGuard
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
      const body = await c.req.json()

      if (!this.verifyType(body)) return c.text('Invalid data', 400)

      const item = await this.service.create(body)
      return c.json(item, 201)
    })
  }

  public static async update() {
    this.routes.patch('/:id', async c => {
      // TODO: Add AdminGuard
      const { id } = c.req.param()
      const body = await c.req.json()

      if (!this.verifyType(body)) return c.text('Invalid data', 400)

      const item = await this.service.update(Number(id), body)

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

export default DefaultController
