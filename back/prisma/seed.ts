// Seed the database with data
import { users, genders, themes, studios, animeTypes } from './seeders'
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

const seed = async () => {
  await users()
  await genders()
  await themes()
  await studios()
  await animeTypes()
}

await seed()
  .then(async () => {
    console.log('Database seeded')
    await prisma.$disconnect()
  })
  .catch(async (e) => {
    console.error(e)
    await prisma.$disconnect()
    process.exit(1)
  })

