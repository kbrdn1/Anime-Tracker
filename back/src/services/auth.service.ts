// Service for authentication - auth.services.ts
import { HTTPException } from 'hono/http-exception'
import { PrismaClient } from '@prisma/client'
import { sign, verify } from 'hono/jwt'

class AuthService {
  private prisma = new PrismaClient()
  private secret = Bun.env.JWT_SECRET
  private saltRounds = Bun.env.SALT_ROUNDS

  public login = async (data: any) => {
    if (!this.secret)
      throw new HTTPException(500, {
        message: 'JWT secret not set',
      })

    const user = await this.prisma.users.findUnique({
      where: { email: data.email },
    })

    if (!user) throw new HTTPException(404, { message: 'User not found' })

    if (!(await this.comparePassword(data.password, user.password)))
      throw new HTTPException(401, { message: 'Invalid password' })

    const token = await sign(user, this.secret)

    if (!token)
      throw new HTTPException(500, { message: 'Failed to sign token' })

    return token
  }

  public register = async (data: any) => {
    data.password = await this.hashPassword(data.password)

    try {
      return await this.prisma.users.create({ data })
    } catch (err) {
      throw new HTTPException(500, { message: 'Failed to create user' })
    }
  }

  public verify = async (token: string) => {
    if (!this.secret)
      throw new HTTPException(500, {
        message: 'JWT secret not set',
      })

    const decodedPayload = await verify(token, this.secret)

    if (!decodedPayload)
      throw new HTTPException(401, { message: 'Invalid token' })

    return decodedPayload
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

  private comparePassword = async (password: string, hash: string) => {
    try {
      return await Bun.password.verify(password, hash)
    } catch (err) {
      throw new HTTPException(500, { message: 'Failed to compare passwords' })
    }
  }
}

export default new AuthService()
