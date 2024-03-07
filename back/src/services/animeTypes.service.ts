// Service for anime types - animeTypes.service.ts
import { prisma } from '@/middlewares'
import { HTTPException } from 'hono/http-exception'
import {
  capitalizeFirstLetter,
  capitalizeFirstLetterOfEachPhrase,
} from '@/utils'

class AnimeTypesService {
  private animeTypes = prisma.animeTypes

  public getAll = async (
    filters: Record<string, string>,
    limit?: number,
    offset?: number,
    orderBy?: string,
    order?: string,
    trash?: boolean
  ) => {
    const { name } = filters

    return await this.animeTypes.findMany({
      where: {
        AND: [
          name ? { name: { contains: name } } : {},
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
    const { name } = filters

    return await this.animeTypes.count({
      where: {
        AND: [
          name ? { name: { contains: name } } : {},
          trash
            ? { deleted_at: { not: null } }
            : { deleted_at: { equals: null } },
        ],
      },
    })
  }

  public get = async (id: number) => {
    if (!id) throw new HTTPException(400, { message: 'ID is required' })

    const status = await this.animeTypes.findUnique({ where: { id } })

    if (!status) throw new HTTPException(404, { message: 'Status not found' })

    return status
  }

  public create = async (data: any) => {
    if (!data.name)
      throw new HTTPException(400, { message: 'Name is required' })

    data.name = this.formatName(data.name)
    if (data.description)
      data.description = this.formatDescription(data.description)

    const status = await this.animeTypes.create({ data })

    if (!status)
      throw new HTTPException(500, { message: 'Failed to create status' })

    return status
  }

  public update = async (id: number, data: any) => {
    if (!id) throw new HTTPException(400, { message: 'ID is required' })

    if (data.name) data.name = this.formatName(data.name)
    if (data.description)
      data.description = this.formatDescription(data.description)

    const status = await this.animeTypes.update({ where: { id }, data })

    if (!status)
      throw new HTTPException(500, { message: 'Failed to update status' })

    return status
  }

  public destroy = async (id: number) => {
    if (!id) throw new HTTPException(400, { message: 'ID is required' })

    const status = await this.animeTypes.delete({ where: { id } })

    if (!status)
      throw new HTTPException(500, { message: 'Failed to delete status' })

    return status
  }

  private formatName = (str: string) => {
    return capitalizeFirstLetter(str)
  }

  private formatDescription = (str: string) => {
    return capitalizeFirstLetterOfEachPhrase(str)
  }
}

export default new AnimeTypesService()
