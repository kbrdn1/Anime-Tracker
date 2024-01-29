// Controller for users - users.controller.ts
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export const getUsers = async () => {
  return await prisma.user.findMany()
}

export const getUser = async (id: number) => {
  return await prisma.user.findUnique({
    where: {
      id: id,
    },
  })
}
