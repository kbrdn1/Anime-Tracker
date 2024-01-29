// Seed the database with data
import { PrismaClient } from '@prisma/client'
import { faker } from '@faker-js/faker'

const prisma = new PrismaClient()

const users = async () => {
  for (let i = 0; i < 10; i++) {
    await prisma.user.upsert({
      where: {
        id: i + 1
      },
      update: {},
      create: {
        id: i + 1,
        firstName: faker.person.firstName(),
        lastName: faker.person.lastName(),
        email: faker.internet.email(),
        password: faker.internet.password()
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