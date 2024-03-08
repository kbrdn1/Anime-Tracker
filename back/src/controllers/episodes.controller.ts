// Controller for episodes - episodes.controller.ts
import DefaultController from './DefaultController'
import { episodesService } from '@/services'

class EpisodesController extends DefaultController {
  constructor() {
    super('/episodes', episodesService, true)
  }
}

export default new EpisodesController()
