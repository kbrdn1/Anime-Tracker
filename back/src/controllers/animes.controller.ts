// Controller for animes - animes.controller.ts
import DefaultController from './DefaultController'
import { animesService } from '@/services'

class AnimesController extends DefaultController {
  constructor() {
    super('/animes', animesService, true)
  }
}

export default new AnimesController()
