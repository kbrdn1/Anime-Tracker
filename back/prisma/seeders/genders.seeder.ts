// Seeder for genders table - genders.seeder.ts
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

const genders = [
  'Action',
  'Comedy',
  'Horror',
  'Sports',
  'Adventure',
  'Drama',
  'Mystery',
  'Supernatural',
  'Avant Garde',
  'Fantasy',
  'Romance',
  'Suspense',
  'Award Winning',
  'Girls Love',
  'Sci-Fi',
  'Boys Love',
  'Gourmet',
  'Slice of Life'
]

const seed = async () => {
  console.info('Seeding genders 🗃️')
  for (let i = 0; i < genders.length; i++) {
    await prisma.genders.upsert({
      where: {
        id: i + 1
      },
      update: {},
      create: {
        name: genders[i]
      },
    })
    console.info(`Gender ${i + 1}/${genders.length} seeded 🏗️`)
  }
  console.info('Gender seeded ✅')
}

export default seed