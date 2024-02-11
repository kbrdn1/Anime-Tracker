// Controller for users - users.controller.ts
import { PrismaClient } from '@prisma/client'
import type User from '@/types/User'

const prisma = new PrismaClient()

export const getUsers = async () => {
  return await prisma.users.findMany()
}

export const getUser = async (id: number) => {
  return await prisma.users.findUnique({
    where: {
      id: id,
    },
  })
}

export const storeUser = async (user: User) => {
  const { username, email, password, bio, avatar, role } = user

  if (!password) return

  return await prisma.users.create({
    data: {
      username,
      email,
      password,
      bio,
      avatar,
      role,
    },
  })
}

export const updateUser = async (id: number, user: User) => {
  const { username, email, password, bio, avatar, role } = user
  return await prisma.users.update({
    where: {
      id,
    },
    data: {
      username,
      email,
      password,
      bio,
      avatar,
      role,
    },
  })
}

export const deleteUser = async (id: number) => {
  return await prisma.users.delete({
    where: {
      id: id,
    },
  })
}
