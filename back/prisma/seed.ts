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
        role: 'user',
        created_at: new Date(),
        updated_at: new Date(),
      }
    })
  }

  //admin
  await prisma.users.upsert({
    where: {
      id: 11
    },
    update: {},
    create: {
      username: 'admin',
      email: 'admin@anime-tacker.fr',
      password: '$2b$10$MQV1aTBKPeP1hkSYdwFeW.MThNQYrzpSZDG08.smbp.R/4mwilM4q',
      avatar: faker.image.avatar(),
      bio: faker.lorem.sentence(),
      role: 'admin',
      created_at: new Date(),
      updated_at: new Date(),
    }
  })
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