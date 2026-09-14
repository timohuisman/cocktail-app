export function requireEnv(name: string): string {
  const value = process.env[name]
  if (!value) {
    throw createError({ statusCode: 500, statusMessage: `Missing required environment variable: ${name}` })
  }
  return value
}
