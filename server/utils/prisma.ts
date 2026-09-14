import { PrismaPg } from '@prisma/adapter-pg'
import { PrismaClient } from '~~/app/generated/prisma/client'

let prisma: PrismaClient | undefined

export function usePrisma() {
  if (!prisma) {
    const adapter = new PrismaPg({ connectionString: process.env.DATABASE_URL! })
    prisma = new PrismaClient({ adapter })
  }
  return prisma
}
