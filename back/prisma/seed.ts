// Seed the database with data
import { PrismaClient } from '@prisma/client'
import { faker } from '@faker-js/faker'

const prisma = new PrismaClient()

const users = async () => {
  for (let i = 0; i < 10; i++) {
    await prisma.users.upsert({
      where: {
        id: i + 1
      },
      update: {},
      create: {
        username: faker.internet.userName(),
        email: faker.internet.email(),
        password: faker.internet.password(),
        avatar: faker.image.avatar(),
        bio: faker.lorem.sentence(),
      }
    })
  }
  console.info('Users seeded')
}

const seed = async () => {
  await users()
}

seed()
  .then(async () => {
    console.log('Database seeded')
    await prisma.$disconnect()
  })
  .catch(async (e) => {
    console.error(e)
    await prisma.$disconnect()
    process.exit(1)
  })