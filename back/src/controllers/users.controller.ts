// Controller for users - users.controller.ts
import DefaultController from './DefaultController'
import { usersService } from '@/services'

class UsersController extends DefaultController {
  constructor() {
    super('/users', usersService, true)
  }
}

export default new UsersController()
