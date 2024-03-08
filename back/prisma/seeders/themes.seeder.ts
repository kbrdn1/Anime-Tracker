// Seeder for themes table - themes.seeder.ts
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

const themes = [
  "Adult Cast",
  "Crossdressing",
  "Gore",
  "Idols (Male)",
  "Mahou Shoujo",
  "Music",
  "Performing Arts",
  "Reverse Harem",
  "Space",
  "Time Travel",
  "Anthropomorphic",
  "Delinquents",
  "Harem",
  "Isekai",
  "Martial Arts",
  "Mythology",
  "Pets",
  "Romantic Subtext",
  "Strategy Game",
  "Vampire",
  "CGDCT",
  "Detective",
  "High Stakes Game",
  "lyashikei",
  "Mecha",
  "Organized Crime",
  "Psychological",
  "Samurai",
  "Super Power",
  "Video Game",
  "Childcare",
  "Educational",
  "Historical",
  "Love Polygon",
  "Medical",
  "Otaku Culture",
  "Racing",
  "School",
  "Survival",
  "Visual Arts",
  "Combat Sports",
  "Gag Humor",
  "Idols (Female)",
  "Magical Sex Shift",
  "Military",
  "Parody",
  "Reincarnation",
  "Showbiz",
  "Team Sports",
  "Workplace"
];

const seed = async () => {
  console.info('Seeding themes 🗃️')
  for (let i = 0; i < themes.length; i++) {
    await prisma.themes.upsert({
      where: {
        id: i + 1
      },
      update: {},
      create: {
        name: themes[i]
      },
    })
    console.info(`Themes ${i + 1}/${themes.length} seeded 🏗️`)
  }
  console.info('Themes seeded ✅')
}

export default seed