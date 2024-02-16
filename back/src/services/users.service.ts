// Service for users - users.service.ts
import { PrismaClient } from '@prisma/client'

class UsersService {
  private prisma = new PrismaClient()

  public getAll = async (
    filters: Record<string, string>,
    limit?: number,
    page?: number,
    offset?: number,
    orderBy?: string,
    order?: string
  ) => {
    const { username, email, role } = filters

    return await this.prisma.users.findMany({
      where: {
        AND: [
          username ? { username: { contains: username } } : {},
          email ? { email: { contains: email } } : {},
          role ? { role: { contains: role } } : {},
        ],
      },
      skip: offset ?? undefined,
      orderBy: [{ [orderBy ?? 'created_at']: order ?? 'desc' }],
      take: limit ?? undefined,
    })
  }

  public count = async (filters: Record<string, string>) => {
    const { username, email, role } = filters

    return await this.prisma.users.count({
      where: {
        AND: [
          username ? { username: { contains: username } } : {},
          email ? { email: { contains: email } } : {},
          role ? { role: { contains: role } } : {},
        ],
      }
    })
  }

  public get = async (id: number) => {
    return await this.prisma.users.findUnique({ where: { id } })
  }

  public create = async (data: any) => {
    return await this.prisma.users.create({ data })
  }

  public update = async (id: number, data: any) => {
    return await this.prisma.users.update({ where: { id }, data })
  }

  public destroy = async (id: number) => {
    return await this.prisma.users.delete({ where: { id } })
  }
}

export default new UsersService()
