// Service for users - users.service.ts
import { prisma } from '@/middlewares'
import { HTTPException } from 'hono/http-exception'

class AuthorsService {
  private authors = prisma.authors

  public getAll = async (
    filters: Record<string, string>,
    limit?: number,
    offset?: number,
    orderBy?: string,
    order?: string,
    trash?: boolean
  ) => {
    const { firstName, lastName, originalFirstName, originalLastName } = filters

    return await this.authors.findMany({
      where: {
        AND: [
          firstName ? { firstname: { contains: firstName } } : {},
          lastName ? { lastname: { contains: lastName } } : {},
          originalFirstName ? { original_firstname: { contains: originalFirstName } } : {},
          originalLastName ? { original_lastname: { contains: originalLastName } } : {},
          trash ? { deleted_at: { not: null } } : { deleted_at: { equals: null } },
        ],
      },
      skip: offset ?? undefined,
      orderBy: [{ [orderBy ?? 'lastname']: order ?? 'desc' }],
      take: limit ?? undefined,
    })
  }

  public count = async (filters: Record<string, string>, trash?: boolean) => {
    const { firstName, lastName, originalFirstName, originalLastName } = filters

    return await this.authors.count({
      where: {
        AND: [
          firstName ? { firstname: { contains: firstName } } : {},
          lastName ? { lastname: { contains: lastName } } : {},
          originalFirstName ? { original_firstname: { contains: originalFirstName } } : {},
          originalLastName ? { original_lastname: { contains: originalLastName } } : {},
          trash ? { deleted_at: { not: null } } : { deleted_at: { equals: null } },
        ],
      },
    })
  }

  public get = async (id: number) => {
    if (!id) throw new HTTPException(400, { message: 'ID is required' })

    const authors = await this.authors.findUnique({ where: { id } })

    if (!authors) throw new HTTPException(404, { message: 'Author not found' })

    return authors
  }

  public create = async (data: any) => {
    if (!data.firstname || !data.lastname)
      throw new HTTPException(400, { message: 'Firstname and lastname are required' })

    data.firstname = this.formatFirstname(data.firstname)
    data.lastname = this.formatLastname(data.lastname)
    const user = await this.authors.create({ data })

    if (!user)
      throw new HTTPException(500, { message: 'Failed to create author' })

    return user
  }

  public update = async (id: number, data: any) => {
    if (!id) throw new HTTPException(400, { message: 'ID is required' })

    const authors = await this.authors.update({ where: { id }, data })

    if (!authors)
      throw new HTTPException(500, { message: 'Failed to update author' })

    return authors
  }

  public destroy = async (id: number) => {
    if (!id) throw new HTTPException(400, { message: 'ID is required' })

    const authors = await this.authors.delete({ where: { id } })

    if (!authors)
      throw new HTTPException(500, { message: 'Failed to delete author' })

    return authors
  }

  private formatFirstname = (str: string) => {
    return str.charAt(0).toUpperCase() + str.slice(1)
  }

  private formatLastname = (str: string) => {
    return str.toUpperCase()
  }
}

export default new AuthorsService()
