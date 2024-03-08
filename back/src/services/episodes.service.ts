// Service for episodes - episodes.service.ts
import { prisma } from '@/middlewares'
import {
  capitalizeFirstLetter,
  capitalizeFirstLetterOfEachPhrase,
} from '@/utils'
import { HTTPException } from 'hono/http-exception'

class ThemesService {
  private episodes = prisma.episodes

  public getAll = async (
    filters: Record<string, string>,
    limit?: number,
    offset?: number,
    orderBy?: string,
    order?: string,
    trash?: boolean
  ) => {
    const { number, title, japanese_title, start_at, end_at } = filters

    return await this.episodes.findMany({
      where: {
        AND: [
          number ? { number: parseInt(number) } : {},
          title ? { title: { contains: title } } : {},
          japanese_title
            ? { japanese_title: { contains: japanese_title } }
            : {},
          start_at ? { published_at: { gte: new Date(start_at) } } : {},
          end_at ? { published_at: { lte: new Date(end_at) } } : {},
          start_at && end_at
            ? {
                published_at: {
                  gte: new Date(start_at),
                  lte: new Date(end_at),
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

    return await this.episodes.count({
      where: {
        AND: [
          number ? { number: parseInt(number) } : {},
          title ? { title: { contains: title } } : {},
          japanese_title
            ? { japanese_title: { contains: japanese_title } }
            : {},
          start_at ? { published_at: { gte: new Date(start_at) } } : {},
          end_at ? { published_at: { lte: new Date(end_at) } } : {},
          start_at && end_at
            ? {
                published_at: {
                  gte: new Date(start_at),
                  lte: new Date(end_at),
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

    const episode = await this.episodes.findUnique({ where: { id } })

    if (!episode) throw new HTTPException(404, { message: 'Episode not found' })

    return episode
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
 
    if (data.published_at) data.published_at = new Date(data.published_at)

    const episode = await this.episodes.create({ data })

    if (!episode)
      throw new HTTPException(500, { message: 'Failed to create episode' })

    return episode
  }

  public update = async (id: number, data: any) => {
    if (!id) throw new HTTPException(400, { message: 'ID is required' })

    if (data.title) data.title = this.formatTitle(data.title)

    if (data.japanese_title)
      data.japanese_title = this.formatTitle(data.japanese_title)

    if (data.description)
      data.description = this.formatDescription(data.description)

    if (data.published_at) data.published_at = new Date(data.published_at)

    const episode = await this.episodes.update({ where: { id }, data })

    if (!episode)
      throw new HTTPException(500, { message: 'Failed to update episode' })

    return episode
  }

  public destroy = async (id: number) => {
    if (!id) throw new HTTPException(400, { message: 'ID is required' })

    const episode = await this.episodes.delete({ where: { id } })

    if (!episode)
      throw new HTTPException(500, { message: 'Failed to delete episode' })

    return episode
  }

  private formatTitle = (str: string) => {
    return capitalizeFirstLetter(str)
  }

  private formatDescription = (str: string) => {
    return capitalizeFirstLetterOfEachPhrase(str)
  }
}

export default new ThemesService()
