// Seeder for animeTypes table - animeTypes.seeder.ts
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

const animeTypes = [
  'Josei',
  'Kodomo',
  'Seinen',
  'Shônen',
  'Shôjo',
]

const seed = async () => {
  console.info('Seeding anime types 💮')
  for (let i = 0; i < animeTypes.length; i++) {
    await prisma.animeTypes.upsert({
      where: {
        id: i + 1
      },
      update: {},
      create: {
        name: animeTypes[i]
      },
    })
    console.info(`Anime types ${i + 1}/${animeTypes.length} seeded 🏗️`)
  }
  console.info('Anime types seeded ✅')
}

export default seed