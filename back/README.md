# Anime Tracker Back

## Tech stack
- [Bun](https://bun.sh/)
- [Prettier](https://prettier.io/)
- [TypeScript](https://www.typescriptlang.org/)
- [Hono](https://hono.dev/)
- [Prisma](https://www.prisma.io/)
- [JWT](https://jwt.io/)
- [Bcrypt](https://www.npmjs.com/package/bcrypt)

## Setup

```
bun install
docker-compose up -d
bun dev
```

```
open http://localhost:3000
```

## Project Structure

```
back
├── prisma
│   ├── migrations
│   ├── schema.prisma
│   └── seed.ts
├── src
│   ├── constants
│   ├── controllers
│   ├── middlewares
│   ├── models
│   ├── routes
│   ├── services
│   ├── types
│   ├── utils
│   └── index.ts
├── .env.example
├── .gitignore
├── docker-compose.yml
├── package.json
├── prettier.config.mjs
├── README.md
└── tsconfig.json
```
