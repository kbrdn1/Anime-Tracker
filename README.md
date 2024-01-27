# Anime Tracker

## Description

Anime Tracker is a web application that allows you to track your favorite anime and manga.

## Features
- [ ] User/Admin Account
  - [ ] Login
  - [ ] Register
  - [ ] Forgot Password
  - [ ] Reset Password
  - [ ] Change Password
  - [ ] Change Email
  - [ ] Delete Account
- [ ] Language
- [ ] Theme
  - [ ] Light
  - [ ] Dark
  - [ ] System
  - [ ] Custom
    - [ ] Kimetsu no Yaiba
    - [ ] Jujutsu Kaisen
    - [ ] Naruto
    - [ ] One Piece
    - [ ] Dragon Ball
    - [ ] My Hero Academia
    - [ ] Hunter x Hunter
    - [ ] Bleach
    - [ ] Attack on Titan
- [ ] Profile
  - [ ] Viewing Time
  - [ ] Rank
  - [ ] Achievements
  - [ ] Avatar
  - [ ] Display top 3/5/10 previously watched animes
  - [ ] 3 recommendations of animes
- [ ] Mini Calendar
- [ ] List of animes
- [ ] Anime selection etc…
- [ ] Watchlist / Favorites
- [ ] Achievements
- [ ] Rank
- [ ] Search
- [ ] Notifications
> Work in progress

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
- [GitHub Actions](https://docs.github.com/fr/actions)

### Tools
- [VSCode](https://code.visualstudio.com/)
- [Postman](https://www.postman.com/)
- [Trello](https://trello.com/)

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
## Naming conventions

### Branches
Use the following prefixes for your branch names:
- `feature/#<issue-number>-<feature-name>`
- `bugfix/#<issue-number>-<bugfix-name>`
- `hotfix/#<issue-number>-<hotfix-name>`
- `chore/#<issue-number>-<chore-name>`
- `refactor/#<issue-number>-<refactor-name>`
- `test/#<issue-number>-<test-name>`
- `docs/#<issue-number>-<docs-name>`

#### Examples
- `feature/#1-add-new-feature`
- `bugfix/#2-fix-typo`
- `hotfix/#3-fix-bug`

### Pull Requests
Use the following prefixes for your pull request titles:
`[#<issue-number>] <pull-request-title>`

#### Examples
- `[#1] Add new feature`


### Commits
Use the following prefixes for your commit messages:
`<emoji> <type>(<scope>)<!>: <subject>`

#### Emojis
Use the following emoji prefixes for your commit messages [Gitmoji](https://gitmoji.dev/)

You can install the Gitmoji extension for VSCode [here](https://marketplace.visualstudio.com/items?itemName=seatonjiang.gitmoji-vscode)

#### Types
Choose a type from the following list, in terms of the kind of change that you're committing:
- `feat`: A new feature
- `fix`: A bug fix
- `docs`: Documentation only changes
- `style`: Changes that do not affect the meaning of the code (white-space, formatting, missing semi-colons, etc)
- `refactor`: A code change that neither fixes a bug nor adds a feature
- `perf`: A code change that improves performance
- `test`: Adding missing or correcting existing tests
- `chore`: Changes to the build process or auxiliary tools and libraries such as documentation generation

#### Scopes
Choose a scope from the following list, in terms of the location of the change:
- `app`
- `back`

#### Breaking Changes
Any breaking changes should be indicated with `!` after the type/scope. e.g. `✨ feat(back)!: this is a breaking change`

#### Subject
- Describe what you did in imperative mood, e.g.:
  | Word | Description | Example |
  | --- | --- | --- |
  | `add` | Create a capability e.g. feature, test, dependency. | `✨ feat: add new feature` |
  | `change` | Change behavior of the code e.g. refactor, style, doc. | `🔧 chore: change config` |
  | `remove` | Delete a capability e.g. feature, test, dependency. | `🔥 feat: remove feature` |
  | `fix` | Fix an issue e.g. bug, typo, accident, misstatement. | `🐛 fix: fix typo` |
  | `bump` | Increase the version of something e.g. dependency. | `⬆️ chore: bump version` |
  | `make` | Add or change something to make it work. | `🏗 chore: make build` |
  | `start` | Begin doing something; e.g. create a feature flag. | `🏁 chore: start feature flag` |
  | `stop` | End doing something; e.g. remove a feature flag. | `🏁 chore: stop feature flag` |
  | `optimize` | A change that MUST be just about performance, e.g. speed up code. | `🚀 chore: optimize code` |
  | `revert` | Revert a change e.g. revert commit. | `⏪ chore: revert commit` |
  | `clean` | A change that MUST be just about removing code. | `🧹 chore: clean code` |
  | `disable` | A change that MUST be just about disabling code. | `🔒 chore: disable code` |
  | `refactor` | A change that MUST be just about refactoring code. | `♻️ chore: refactor code` |
  | `update` | A change that MUST be just about updating code. | `🚀 chore: update code` |
  | `improve` | A change that MUST be just about improving code. | `🚀 chore: improve code` |
  | `clean` | A change that MUST be just about cleaning code. | `🧹 chore: clean code` |
  | `optimize` | A change that MUST be just about optimizing code. | `🚀 chore: optimize code` |
  > Source: [Conventional Commits](https://www.conventionalcommits.org/en/v1.0.0/)
- Don't capitalize first letter
- No dot (.) at the end

#### Examples
- `✨ feat(app): add new feature`
- `🐛 fix(app): fix typo`
- `🔧 chore(app): change config`
- `🔥 feat(app)!: remove feature`

## Realease
Versioning is done automatically by [GitHub Actions](https://docs.github.com/fr/actions)

`<major>.<minor>.<patch>`
- `major`: Breaking changes
- `minor`: New features
- `patch`: Bug fixes

### Examples
- `1.0.0` First release
- `1.1.0` New feature
- `1.1.1` Bug fix

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