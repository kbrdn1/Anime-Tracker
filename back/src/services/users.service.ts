// Service for users - users.service.ts
import { PrismaClient } from '@prisma/client'

class UsersService {
  private prisma = new PrismaClient()

  public getAll = async () => {
    // TODO: Add pagination
    return await this.prisma.users.findMany()
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

  public delete = async (id: number) => {
    return await this.prisma.users.delete({ where: { id } })
  }
}

export default new UsersService()