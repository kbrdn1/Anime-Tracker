// Middlewares Exports - index.ts
import prisma from './prisma.guard'
import adminGuard from './admin.guard'

export { adminGuard, prisma }
