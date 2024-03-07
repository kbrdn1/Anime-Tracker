// Controller for statuses - statuses.controller.ts
import DefaultController from './DefaultController'
import { statusesService } from '@/services'

class StatusesController extends DefaultController {
  constructor() {
    super('/statuses', statusesService, true)
  }
}

export default new StatusesController()
