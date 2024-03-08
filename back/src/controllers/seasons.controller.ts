// Controller for seasons - seasons.controller.ts
import DefaultController from './DefaultController'
import { seasonsService } from '@/services'

class SeasonsController extends DefaultController {
  constructor() {
    super('/seasons', seasonsService, true)
  }
}

export default new SeasonsController()
