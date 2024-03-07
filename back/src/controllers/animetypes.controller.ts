// Controller for anime types - animeTypes.controller.ts
import DefaultController from './DefaultController'
import { animeTypesService } from '@/services'

class AnimeTypesController extends DefaultController {
  constructor() {
    super('/animes-types', animeTypesService, true)
  }
}

export default new AnimeTypesController()
