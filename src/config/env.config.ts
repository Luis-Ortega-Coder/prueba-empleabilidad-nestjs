import dotenv from 'dotenv';
import { z } from 'zod';

export function enviroment() {
  dotenv.config();

  const envSchema = z.object({
    DATABASE_HOST: z.string(),
    DATABASE_PORT: z.coerce.number().int().min(1).max(65535),
    DATABASE_USER: z.string(),
    DATABASE_PASSWORD: z.string(),
    DATABASE_NAME: z.string(),
    DATABASE_LOGGING: z.string().min(5),
    DATABASE_SYNCHRONIZE: z.string().min(5),
    DATABASE_SSL: z.string().min(5),
    DATABASE_CONNECTION_MAX: z.coerce.number().int().min(1),
    DATABASE_TIME_WAIT_CONNECTION: z.number().int().min(1),
    DATABASE_TIMEOUT_CONNECTION: z.number().int().min(1),
  });

  const _env = envSchema.safeParse(process.env);

  if (!_env.success) {
    const flatened = _env.error.flatten();
    console.error(`variables de entorno invalidas ${JSON.stringify(flatened)}
    `);
    process.exit(1);
  }
  return _env.data as Readonly<typeof _env.data>;
}
