// Controller for genders - genders.controller.ts
import DefaultController from './DefaultController'
import { gendersService } from '@/services'

class GendersController extends DefaultController {
  constructor() {
    super('/genders', gendersService, true)
  }
}

export default new GendersController()
