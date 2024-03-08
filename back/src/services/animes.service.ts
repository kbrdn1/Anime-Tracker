// Service for animes - animes.service.ts
import { prisma } from '@/middlewares'
import {
  capitalizeFirstLetter,
  capitalizeFirstLetterOfEachPhrase,
  urlRegex,
} from '@/utils'
import { HTTPException } from 'hono/http-exception'

class AnimesService {
  private animes = prisma.animes

  public getAll = async (
    filters: Record<string, string>,
    limit?: number,
    offset?: number,
    orderBy?: string,
    order?: string,
    trash?: boolean
  ) => {
    const {
      title,
      japanese_title,
      crunchyroll_ref,
      adn_ref,
      my_anime_list_ref,
      start_at,
      end_at,
    } = filters

    return await this.animes.findMany({
      where: {
        AND: [
          title ? { title: { contains: title } } : {},
          japanese_title
            ? { japanese_title: { contains: japanese_title } }
            : {},
          crunchyroll_ref
            ? { crunchyroll_ref: { contains: crunchyroll_ref } }
            : {},
          adn_ref ? { adn_ref: { contains: adn_ref } } : {},
          my_anime_list_ref
            ? { my_anime_list_ref: { contains: my_anime_list_ref } }
            : {},
          start_at
            ? {
                seasons: {
                  every: {
                    episodes: {
                      every: {
                        published_at: { gte: new Date(start_at) },
                      },
                    },
                  },
                },
              }
            : {},
          end_at
            ? {
                seasons: {
                  every: {
                    episodes: {
                      every: {
                        published_at: { lte: new Date(end_at) },
                      },
                    },
                  },
                },
              }
            : {},
          start_at && end_at
            ? {
                seasons: {
                  every: {
                    episodes: {
                      every: {
                        published_at: {
                          gte: new Date(start_at),
                          lte: new Date(end_at),
                        },
                      },
                    },
                  },
                },
              }
            : {},
          trash
            ? { deleted_at: { not: null } }
            : { deleted_at: { equals: null } },
        ],
      },
      skip: offset ?? undefined,
      orderBy: [{ [orderBy ?? 'name']: order ?? 'asc' }],
      take: limit ?? undefined,
    })
  }

  public count = async (filters: Record<string, string>, trash?: boolean) => {
    const {
      title,
      japanese_title,
      crunchyroll_ref,
      adn_ref,
      my_anime_list_ref,
      start_at,
      end_at,
    } = filters

    return await this.animes.count({
      where: {
        AND: [
          title ? { title: { contains: title } } : {},
          japanese_title
            ? { japanese_title: { contains: japanese_title } }
            : {},
          crunchyroll_ref
            ? { crunchyroll_ref: { contains: crunchyroll_ref } }
            : {},
          adn_ref ? { adn_ref: { contains: adn_ref } } : {},
          my_anime_list_ref
            ? { my_anime_list_ref: { contains: my_anime_list_ref } }
            : {},
          start_at
            ? {
                seasons: {
                  every: {
                    episodes: {
                      every: {
                        published_at: { gte: new Date(start_at) },
                      },
                    },
                  },
                },
              }
            : {},
          end_at
            ? {
                seasons: {
                  every: {
                    episodes: {
                      every: {
                        published_at: { lte: new Date(end_at) },
                      },
                    },
                  },
                },
              }
            : {},
          start_at && end_at
            ? {
                seasons: {
                  every: {
                    episodes: {
                      every: {
                        published_at: {
                          gte: new Date(start_at),
                          lte: new Date(end_at),
                        },
                      },
                    },
                  },
                },
              }
            : {},
          trash
            ? { deleted_at: { not: null } }
            : { deleted_at: { equals: null } },
        ],
      },
    })
  }

  public get = async (id: number) => {
    if (!id) throw new HTTPException(400, { message: 'ID is required' })

    const anime = await this.animes.findUnique({ where: { id } })

    if (!anime) throw new HTTPException(404, { message: 'Anime not found' })

    return anime
  }

  public create = async (data: any) => {
    if (!data.title)
      throw new HTTPException(400, { message: 'Title is required' })

    data.title = this.formatTitle(data.title)

    if (data.japanese_title)
      data.japanese_title = this.formatTitle(data.japanese_title)

    if (data.description)
      data.description = this.formatDescription(data.description)

    if (data.trailer && !this.urlValidator(data.trailer))
      throw new HTTPException(400, { message: 'Invalid trailer URL' })

    if (data.cover_img && !this.urlValidator(data.cover_img))
      throw new HTTPException(400, { message: 'Invalid cover image URL' })

    if (data.banner_img && !this.urlValidator(data.banner_img))
      throw new HTTPException(400, { message: 'Invalid banner image URL' })

    const anime = await this.animes.create({ data })

    if (!anime)
      throw new HTTPException(500, { message: 'Failed to create anime' })

    return anime
  }

  public update = async (id: number, data: any) => {
    if (!id) throw new HTTPException(400, { message: 'ID is required' })

    if (data.title) data.title = this.formatTitle(data.title)

    if (data.japanese_title)
      data.japanese_title = this.formatTitle(data.japanese_title)

    if (data.description)
      data.description = this.formatDescription(data.description)

    if (data.trailer && !this.urlValidator(data.trailer))
      throw new HTTPException(400, { message: 'Invalid trailer URL' })

    if (data.cover_img && !this.urlValidator(data.cover_img))
      throw new HTTPException(400, { message: 'Invalid cover image URL' })

    if (data.banner_img && !this.urlValidator(data.banner_img))
      throw new HTTPException(400, { message: 'Invalid banner image URL' })

    const anime = await this.animes.update({ where: { id }, data })

    if (!anime)
      throw new HTTPException(500, { message: 'Failed to update anime' })

    return anime
  }

  public destroy = async (id: number) => {
    if (!id) throw new HTTPException(400, { message: 'ID is required' })

    const season = await this.animes.delete({ where: { id } })

    if (!season)
      throw new HTTPException(500, { message: 'Failed to delete season' })

    return season
  }

  private formatTitle = (str: string) => {
    return capitalizeFirstLetter(str)
  }

  private formatDescription = (str: string) => {
    return capitalizeFirstLetterOfEachPhrase(str)
  }

  private urlValidator = (url: string) => {
    return urlRegex.test(url)
  }
}

export default new AnimesService()
