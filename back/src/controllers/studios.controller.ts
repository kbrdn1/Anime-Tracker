// Controller for studios - studios.controller.ts
import DefaultController from './DefaultController'
import { studiosService } from '@/services'

class StudiosController extends DefaultController {
  constructor() {
    super('/studios', studiosService, true)
  }
}

export default new StudiosController()
