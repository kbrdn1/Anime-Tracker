// Service for users - users.service.ts
import { prisma } from '@/middlewares'
import { HTTPException } from 'hono/http-exception'

class GendersService {
  private genders = prisma.genders

  public getAll = async (
    filters: Record<string, string>,
    limit?: number,
    offset?: number,
    orderBy?: string,
    order?: string,
    trash?: boolean
  ) => {
    const { name } = filters

    return await this.genders.findMany({
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

    return await this.genders.count({
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

    const gender = await this.genders.findUnique({ where: { id } })

    if (!gender) throw new HTTPException(404, { message: 'Gender not found' })

    return gender
  }

  public create = async (data: any) => {
    if (!data.name)
      throw new HTTPException(400, { message: 'Name is required' })

    data.name = this.formatName(data.name)
    if (data.description)
      data.description = this.formatDescription(data.description)

    const gender = await this.genders.create({ data })

    if (!gender)
      throw new HTTPException(500, { message: 'Failed to create gender' })

    return gender
  }

  public update = async (id: number, data: any) => {
    if (!id) throw new HTTPException(400, { message: 'ID is required' })

    if (data.name) data.name = this.formatName(data.name)
    if (data.description)
      data.description = this.formatDescription(data.description)

    const gender = await this.genders.update({ where: { id }, data })

    if (!gender)
      throw new HTTPException(500, { message: 'Failed to update gender' })

    return gender
  }

  public destroy = async (id: number) => {
    if (!id) throw new HTTPException(400, { message: 'ID is required' })

    const gender = await this.genders.delete({ where: { id } })

    if (!gender)
      throw new HTTPException(500, { message: 'Failed to delete gender' })

    return gender
  }

  private formatName = (str: string) => {
    return str.charAt(0).toUpperCase() + str.slice(1)
  }

  private formatDescription = (str: string) => {
    return str.charAt(0).toUpperCase() + str.slice(1)
  }
}

export default new GendersService()
