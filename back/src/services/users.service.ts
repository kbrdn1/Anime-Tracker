import { PrismaClient } from '@prisma/client'

class UsersService {
  private prisma = new PrismaClient()

  public async getAll() {
    // TODO: Add pagination
    return await this.prisma.users.findMany()
  }
}