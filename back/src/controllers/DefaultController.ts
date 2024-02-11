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
}