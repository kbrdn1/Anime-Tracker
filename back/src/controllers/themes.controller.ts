// Controller for themes - themes.controller.ts
import DefaultController from './DefaultController'
import { themesService } from '@/services'

class ThemesController extends DefaultController {
  constructor() {
    super('/themes', themesService, true)
  }
}

export default new ThemesController()
