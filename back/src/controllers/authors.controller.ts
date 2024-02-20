// Controller for authors - authors.controller.ts
import DefaultController from './DefaultController'
import { authorsService } from '@/services'

class UsersController extends DefaultController {
  constructor() {
    super('/authors', authorsService, true)
  }
}

export default new UsersController()
