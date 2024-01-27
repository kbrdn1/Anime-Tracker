# Anime Tracker

## Description

Anime Tracker is a web application that allows you to track your favorite anime and manga.

## Features

## Tech Stack

### Common
- [Bun](https://bun.sh/)
- [Prettier](https://prettier.io/)
- [TypeScript](https://www.typescriptlang.org/)

### Frontend
- [Vite](https://vitejs.dev/)
- [React](https://reactjs.dev/)
- [PandaCSS](https://panda-css.com/)
- [Lucide](https://lucide.dev/)
- [ESLint](https://eslint.org/)

### Backend
- [Hono](https://hono.dev/)
- [Prisma](https://www.prisma.io/)
- [JWT](https://jwt.io/)
- [Bcrypt](https://www.npmjs.com/package/bcrypt)

### Database
- [MariaDB](https://mariadb.org/)
- [PhpMyAdmin](https://www.phpmyadmin.net/)

### DevOps
- [Docker](https://www.docker.com/)
- [Docker Compose](https://docs.docker.com/compose/)
- GitHub Actions

### Tools
- [VSCode](https://code.visualstudio.com/)
- [Postman](https://www.postman.com/)

## Setup
```bash
git clone git@github.com:kbrdn1/Anime-Tracker.git
```

### App
```
cd app
bun install
bun dev
```

```
open http://localhost:5173
```

### Back
```
cd back
bun install
docker-compose up -d
bun dev
```

```
open http://localhost:3000
```

## Project Structure

```
.
├── app
│   ├── src
│   │   ├── assets
│   │   ├── components
│   │   │   ├── containers
│   │   │   ├── layouts
│   │   │   ├── forms
│   │   │   └── typography
│   │   ├── constants
│   │   ├── hooks
│   │   ├── pages
│   │   ├── router
│   │   │   └── security
│   │   ├── stores
│   │   │   ├── contexts
│   │   │   └── providers
│   │   ├── styles
│   │   ├── types
│   │   ├── utils
│   │   ├── App.tsx
│   │   ├── main.tsx
│   │   ├── vite-env.d.ts
│   │   └── index.html
│   ├── .env.example
│   ├── .eslintrc.cjs
│   ├── .gitignore
|   ├── .prettierignore
│   ├── index.html
│   ├── package.json
│   ├── panda.config.ts
│   ├── postcss.config.ts
|   ├── .prettierignore
│   ├── prettier.config.mjs
│   ├── README.md
│   ├── tsconfig.json
│   ├── tsconfig.node.json
│   └── vite.config.ts
├── back
│   ├── prisma
│   │   ├── migrations
│   │   ├── schema.prisma
│   │   └── seed.ts
│   ├── src
│   │   ├── constants
│   │   ├── controllers
│   │   ├── middlewares
│   │   ├── models
│   │   ├── routes
│   │   ├── services
│   │   ├── types
│   │   ├── utils
│   │   └── index.ts
│   ├── .env.example
│   ├── .gitignore
|   ├── .prettierignore
│   ├── docker-compose.yml
│   ├── package.json
│   ├── prettier.config.mjs
│   ├── README.md
│   └── tsconfig.json
├── .nvmrc
├── .prettierignore
├── prettier.config.mjs
├── package.json
└── README.md
```