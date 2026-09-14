import { PrismaBetterSqlite3 } from '@prisma/adapter-better-sqlite3'
import { PrismaClient } from '~~/app/generated/prisma/client'

let prisma: PrismaClient | undefined

export function usePrisma() {
  if (!prisma) {
    const adapter = new PrismaBetterSqlite3({ url: process.env.DATABASE_URL! })
    prisma = new PrismaClient({ adapter })
  }
  return prisma
}
