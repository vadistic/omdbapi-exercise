export const configuration = () => ({
  port: parseInt(process.env.PORT, 10) || 3000,

  postgres_host: process.env.POSTGRES_HOST,
  postgres_port: parseInt(process.env.POSTGRES_PORT, 10) || 5432,
  postgres_db: process.env.POSTGRES_DB,
  postgres_user: process.env.POSTGRES_USER,
  postgres_password: process.env.POSTGRES_PASSWORD,
})

export type Config = ReturnType<typeof configuration>
