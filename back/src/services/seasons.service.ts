// Service for seasons - seasons.service.ts
import { prisma } from '@/middlewares'
import {
  capitalizeFirstLetter,
  capitalizeFirstLetterOfEachPhrase,
} from '@/utils'
import { HTTPException } from 'hono/http-exception'

class SeasonsService {
  private seasons = prisma.seasons

  public getAll = async (
    filters: Record<string, string>,
    limit?: number,
    offset?: number,
    orderBy?: string,
    order?: string,
    trash?: boolean
  ) => {
    const { number, title, japanese_title, start_at, end_at } = filters

    return await this.seasons.findMany({
      where: {
        AND: [
          number ? { number: parseInt(number) } : {},
          title ? { title: { contains: title } } : {},
          japanese_title
            ? { japanese_title: { contains: japanese_title } }
            : {},
          start_at ? { episodes: { every: { published_at: { gte: new Date(start_at) } } } } : {},
          end_at ? { episodes: { every: { published_at: { lte: new Date(end_at) } } } } : {},
          start_at && end_at
            ? {
                episodes: {
                  every: {
                    published_at: {
                      gte: new Date(start_at),
                      lte: new Date(end_at),
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
      orderBy: [{ [orderBy ?? 'name']: order ?? 'desc' }],
      take: limit ?? undefined,
    })
  }

  public count = async (filters: Record<string, string>, trash?: boolean) => {
    const { number, title, japanese_title, start_at, end_at } = filters

    return await this.seasons.count({
      where: {
        AND: [
          number ? { number: parseInt(number) } : {},
          title ? { title: { contains: title } } : {},
          japanese_title
            ? { japanese_title: { contains: japanese_title } }
            : {},
          start_at ? { episodes: { every: { published_at: { gte: new Date(start_at) } } } } : {},
          end_at ? { episodes: { every: { published_at: { lte: new Date(end_at) } } } } : {},
          start_at && end_at
            ? {
                episodes: {
                  every: {
                    published_at: {
                      gte: new Date(start_at),
                      lte: new Date(end_at),
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

    const season = await this.seasons.findUnique({ where: { id } })

    if (!season) throw new HTTPException(404, { message: 'Season not found' })

    return season
  }

  public create = async (data: any) => {
    if (!data.number)
      throw new HTTPException(400, { message: 'Number is required' })

    if (!data.title)
      throw new HTTPException(400, { message: 'Title is required' })

    data.title = this.formatTitle(data.title)

    if (data.japanese_title)
      data.japanese_title = this.formatTitle(data.japanese_title)

    if (data.description)
      data.description = this.formatDescription(data.description)

    const season = await this.seasons.create({ data })

    if (!season)
      throw new HTTPException(500, { message: 'Failed to create season' })

    return season
  }

  public update = async (id: number, data: any) => {
    if (!id) throw new HTTPException(400, { message: 'ID is required' })

    if (data.title) data.title = this.formatTitle(data.title)

    if (data.japanese_title)
      data.japanese_title = this.formatTitle(data.japanese_title)

    if (data.description)
      data.description = this.formatDescription(data.description)

    const season = await this.seasons.update({ where: { id }, data })

    if (!season)
      throw new HTTPException(500, { message: 'Failed to update season' })

    return season
  }

  public destroy = async (id: number) => {
    if (!id) throw new HTTPException(400, { message: 'ID is required' })

    const season = await this.seasons.delete({ where: { id } })

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
}

export default new SeasonsService()
