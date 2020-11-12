export const configuration = () => ({
  port: int(process.env.PORT) || 3000,

  postgres_host: process.env.POSTGRES_HOST,
  postgres_port: int(process.env.POSTGRES_PORT) || 5432,
  postgres_db: process.env.POSTGRES_DB,
  postgres_user: process.env.POSTGRES_USER,
  postgres_password: process.env.POSTGRES_PASSWORD,

  omdb_key: process.env.OMDB_KEY,
})

export type Config = Required<ReturnType<typeof configuration>>

const int = (value: string | undefined) => {
  if (value === undefined) return undefined

  const parsed = parseInt(value, 10)

  return Number.isNaN(parsed) ? undefined : parsed
}
