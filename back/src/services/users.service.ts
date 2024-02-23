// Service for users - users.service.ts
import { env } from 'bun'
import { prisma } from '@/middlewares'
import { HTTPException } from 'hono/http-exception'
import { usernameRegex, emailRegex, passwordRegex } from '@/utils'
import { usersRessource } from '@/ressources'

class UsersService {
  private users = prisma.users
  private saltRounds = env.SALT_ROUNDS

  public getAll = async (
    filters: Record<string, string>,
    limit?: number,
    offset?: number,
    orderBy?: string,
    order?: string,
    trash?: boolean
  ) => {
    const { username, email, role } = filters

    const users = await this.users.findMany({
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

    return this.manyRessource(users)
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

    return this.ressource(user)
  }

  public getByEmail = async (email: string) => {
    if (!email) throw new HTTPException(400, { message: 'Email is required' })

    this.validateEmail(email)

    const user = await this.users.findUnique({ where: { email: email } })

    if (!user) throw new HTTPException(404, { message: 'User not found' })

    return user
  }

  public create = async (data: any) => {
    const { username, email, password } = data
    if (!username || !email || !password)
      throw new HTTPException(400, {
        message: 'Username, email and password are required',
      })

    this.validateUsername(username)
    this.validateEmail(email)
    this.validatePassword(password)

    data.email = this.formatEmail(data.email)
    data.password = await this.hashPassword(data.password)

    const user = await this.users.create({ data })

    if (!user)
      throw new HTTPException(500, { message: 'Failed to create user' })

    return this.ressource(user)
  }

  public update = async (id: number, data: any) => {
    const { username, email, password } = data
    if (!id) throw new HTTPException(400, { message: 'ID is required' })

    if (username) this.validateUsername(username)

    if (email) this.validateEmail(email)

    if (password) this.validatePassword(password)

    if (email) data.email = this.formatEmail(data.email)

    const user = await this.users.update({ where: { id }, data })

    if (!user)
      throw new HTTPException(500, { message: 'Failed to update user' })

    return this.ressource(user)
  }

  public destroy = async (id: number) => {
    if (!id) throw new HTTPException(400, { message: 'ID is required' })

    const user = await this.users.delete({ where: { id } })

    if (!user)
      throw new HTTPException(500, { message: 'Failed to delete user' })

    return this.ressource(user)
  }

  public updateTokenExpiration = async (email: string) => {
    const user = await this.getByEmail(email)

    if (!user) throw new HTTPException(404, { message: 'User not found' })

    const updatedUser = await this.users.update({
      where: { id: user.id },
      data: { token_created_at: new Date() },
    })

    if (!updatedUser)
      throw new HTTPException(500, {
        message: 'Failed to update token expiration',
      })

    return this.ressource(updatedUser)
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

  private manyRessource = (users: any) => {
    return users.map((user: any) => usersRessource(user))
  }

  private ressource = (user: any) => {
    return usersRessource(user)
  }

  private formatEmail = (str: string) => {
    return str.toLowerCase()
  }

  private validateUsername = (username: string) => {
    if (!usernameRegex.test(username))
      throw new HTTPException(400, { message: 'Invalid username' })
  }

  private validateEmail = (email: string) => {
    if (!emailRegex.test(email))
      throw new HTTPException(400, { message: 'Invalid email' })
  }

  private validatePassword = (password: string) => {
    if (!passwordRegex.test(password))
      throw new HTTPException(400, {
        message:
          'Invalid password: It must contain at least 6 characters, including at least 1 letter, 1 uppercase letter and 1 number',
      })
  }
}

export default new UsersService()
