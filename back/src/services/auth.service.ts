// Service for authentication - auth.services.ts
import { env } from 'bun'
import { HTTPException } from 'hono/http-exception'
import { sign, verify } from 'hono/jwt'
import { AuthBruteForceProtection, emailRegex, passwordRegex } from '@/utils'
import { usersRessource } from '@/ressources'
import usersService from '@/services/users.service'

class AuthService extends AuthBruteForceProtection {
  private service = usersService
  private secret = env.JWT_SECRET
  private saltRounds = env.SALT_ROUNDS

  constructor() {
    super(Number(env.PASSWORD_ATTEMPTS), Number(env.PASSWORD_DURATION))
  }

  public login = async (data: { email: string; password: string }) => {
    if (!this.secret)
      throw new HTTPException(500, {
        message: 'JWT secret not set',
      })

    const { email, password } = data

    this.validateEmail(email)
    this.has(email)
    this.validatePassword(password)

    const user = await this.service.getByEmail(email)

    if (!user) throw new HTTPException(404, { message: 'User not found' })

    await this.comparePassword(password, user.password, email)

    const token = await sign(this.ressource(user), this.secret)

    if (!token)
      throw new HTTPException(500, { message: 'Failed to sign token' })

    this.createTokenCreationDate(email)

    return token
  }

  public register = async (data: any) => {
    data.password = await this.hashPassword(data.password)

    try {
      const user = await this.service.create(data)
      return this.ressource(user)
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

    await this.validateTokenExpiration(decodedPayload.email)

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

  private comparePassword = async (
    password: string,
    hash: string,
    email?: string
  ) => {
    try {
      if (!(await Bun.password.verify(password, hash))) {
        if (email) {
          this.add(email)
          this.has(email)
        }
        throw new HTTPException(401, { message: 'Invalid password' })
      }
    } catch (err) {
      throw new HTTPException(500, { message: 'Failed to compare passwords' })
    }
  }

  private ressource = (user: any) => {
    return usersRessource(user)
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

  private createTokenCreationDate = (email: string) => {
    this.service.updateTokenExpiration(email)
  }

  private getExpirationDate = (date: Date) => {
    return new Date(date.getTime() + 1000 * 60 * 60 * 24)
  }

  private validateTokenExpiration = async (email: string) => {
    const user = await this.service.getByEmail(email)
    if (!user) throw new HTTPException(404, { message: 'User not found' })

    if (!user.token_created_at)
      throw new HTTPException(500, {
        message: 'Token creation date not found',
      })

    if (this.getExpirationDate(user.token_created_at) < new Date())
      throw new HTTPException(401, { message: 'Token expired' })
  }
}

export default new AuthService()
