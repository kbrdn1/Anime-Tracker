// Middlewares to intercept prisma requests - prisma.guard.ts
import { PrismaClient } from '@prisma/client'
import { HTTPException } from 'hono/http-exception'

const prisma = new PrismaClient().$extends({
  model: {
    users: {
      delete: async (params: any) => {
        const user = await prisma.users.findUnique({ where: { id: params.where.id } })

        if (!user) throw new HTTPException(404, { message: 'User not found' })

        const updatedUser = await prisma.users.update({
          where: { id: params.where.id },
          data: { deleted_at: new Date() },
        })

        return updatedUser
      },
      deleteMany: async (params: any) => {
        const users = await prisma.users.findMany({ where: { id: { in: params.where.id } } })

        if (!users) throw new HTTPException(404, { message: 'Users not found' })

        const updatedUsers = await prisma.users.updateMany({
          where: { id: { in: params.where.id } },
          data: { deleted_at: new Date() },
        })

        return updatedUsers
      }
    },
    authors: {
      delete: async (params: any) => {
        const author = await prisma.authors.findUnique({ where: { id: params.where.id } })

        if (!author) throw new HTTPException(404, { message: 'Author not found' })

        const updatedAuthor = await prisma.authors.update({
          where: { id: params.where.id },
          data: { deleted_at: new Date() },
        })

        return updatedAuthor
      },
      deleteMany: async (params: any) => {
        const authors = await prisma.authors.findMany({ where: { id: { in: params.where.id } } })

        if (!authors) throw new HTTPException(404, { message: 'Authors not found' })

        const updatedAuthors = await prisma.authors.updateMany({
          where: { id: { in: params.where.id } },
          data: { deleted_at: new Date() },
        })

        return updatedAuthors
      }
    }
  }
})

export default prisma
