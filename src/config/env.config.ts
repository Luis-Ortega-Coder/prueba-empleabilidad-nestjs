import dotenv from 'dotenv';
import { z } from 'zod';

export function enviroment() {
  dotenv.config();

  const envSchema = z.object({
    DATABASE_HOST: z.string().min(1).nonempty(),
    DATABASE_PORT: z.coerce.number().int().min(1).max(65535),
    DATABASE_USER: z.string().min(1).nonempty(),
    DATABASE_PASSWORD: z.coerce.string().min(1).nonempty(),
    DATABASE_NAME: z.string().min(1),
    DATABASE_LOGGING: z.string().min(4),
    DATABASE_SYNCHRONIZE: z.string().min(4),
    DATABASE_SSL: z.string().min(4),
    DATABASE_CONNECTION_MAX: z.coerce.number().int().min(1),
    DATABASE_TIME_WAIT_CONNECTION: z.coerce.number().int().min(1),
    DATABASE_TIMEOUT_CONNECTION: z.coerce.number().int().min(1),
    APP_NODE_ENV: z.enum(['development', 'production', 'test']),
    APP_PORT: z.coerce.number().int().min(1).max(65535),
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

export const env = enviroment();
