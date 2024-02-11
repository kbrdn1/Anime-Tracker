import { PrismaClient } from '@prisma/client'

class UsersService {
  private prisma = new PrismaClient()

  public async getAll() {
    // TODO: Add pagination
    return await this.prisma.users.findMany()
  }

  public async get(id: number) {
    return await this.prisma.users.findUnique({ where: { id } })
  }

  public async create(data: any) {
    return await this.prisma.users.create({ data })
  }

  public async update(id: number, data: any) {
    return await this.prisma.users.update({ where: { id }, data })
  }
}

export default new UsersService()