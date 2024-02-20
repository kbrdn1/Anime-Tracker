// Service for users - users.service.ts
import { prisma } from '@/middlewares'
import { HTTPException } from 'hono/http-exception'

class UsersService {
  private users = prisma.users
  private saltRounds = Bun.env.SALT_ROUNDS

  public getAll = async (
    filters: Record<string, string>,
    limit?: number,
    offset?: number,
    orderBy?: string,
    order?: string,
    trash?: boolean
  ) => {
    const { username, email, role } = filters

    return await this.users.findMany({
      where: {
        AND: [
          username ? { username: { contains: username } } : {},
          email ? { email: { contains: email } } : {},
          role ? { role: { contains: role } } : {},
          trash
            ? { deleted_at: { not: null } }
            : { deleted_at: { equals: null } },
        ],
      },
      skip: offset ?? undefined,
      orderBy: [{ [orderBy ?? 'created_at']: order ?? 'desc' }],
      take: limit ?? undefined,
    })
  }

  public count = async (filters: Record<string, string>, trash?: boolean) => {
    const { username, email, role } = filters

    return await this.users.count({
      where: {
        AND: [
          username ? { username: { contains: username } } : {},
          email ? { email: { contains: email } } : {},
          role ? { role: { contains: role } } : {},
          trash
            ? { deleted_at: { not: null } }
            : { deleted_at: { equals: null } },
        ],
      },
    })
  }

  public get = async (id: number) => {
    if (!id) throw new HTTPException(400, { message: 'ID is required' })

    const user = await this.users.findUnique({ where: { id } })

    if (!user) throw new HTTPException(404, { message: 'User not found' })

    return user
  }

  public create = async (data: any) => {
    if (!data.password)
      throw new HTTPException(400, { message: 'Password is required' })

    data.password = await this.hashPassword(data.password)

    const user = await this.users.create({ data })

    if (!user)
      throw new HTTPException(500, { message: 'Failed to create user' })

    return user
  }

  public update = async (id: number, data: any) => {
    if (data.password) data.password = await this.hashPassword(data.password)

    const user = await this.users.update({ where: { id }, data })

    if (!user)
      throw new HTTPException(500, { message: 'Failed to update user' })

    return user
  }

  public destroy = async (id: number) => {
    if (!id) throw new HTTPException(400, { message: 'ID is required' })

    const user = await this.users.delete({ where: { id } })

    if (!user)
      throw new HTTPException(500, { message: 'Failed to delete user' })

    return user
  }

  private hashPassword = async (password: string) => {
    if (!this.saltRounds)
      throw new HTTPException(500, { message: 'Salt rounds not set' })

    try {
      return await Bun.password.hash(password, {
        algorithm: 'bcrypt',
        cost: Number(this.saltRounds),
      })
    } catch (err) {
      throw new HTTPException(500, { message: 'Failed to hash password' })
    }
  }
}

export default new UsersService()
