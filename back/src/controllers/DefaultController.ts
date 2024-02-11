import { Hono } from "hono";

class DefaultController {

  private static basePath: string = '/'
  private static routes = new Hono().basePath(DefaultController.basePath)
  private static service: any
  private static isProtected: boolean = false

  constructor(basePath: string, tableName: string, isProtected: boolean = false) {
    DefaultController.basePath = basePath
    DefaultController.service = import(`@/services/${tableName}.service`)
    DefaultController.isProtected = isProtected
  }

  public static async index() {
    this.routes.get('/', async c => {
      return c.json(this.service.getAll())
    })
  }

  public static async show() {
    this.routes.get('/:id', async c => {
      const { id } = c.req.param()

      const item = await this.service.get(Number(id))

      if (!item) return c.text('Item not found', 404)

      return c.json(item)
    })
  }
}