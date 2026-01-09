import 'reflect-metadata';
import { DataSource } from 'typeorm';
import { env } from './env.config';
import {
  Access,
  JobVacancy,
  Role,
  User,
  JobVacancyUser,
  Location,
} from '../entities/index';

export const AppDataSource = new DataSource({
  type: 'postgres',
  host: env.DATABASE_HOST,
  port: env.DATABASE_PORT,
  username: env.DATABASE_USER,
  password: env.DATABASE_PASSWORD,
  database: env.DATABASE_NAME,
  synchronize: env.DATABASE_SYNCHRONIZE === 'true',
  logging: env.DATABASE_LOGGING === 'true',
  entities: [Access, Role, User, Location, JobVacancy, JobVacancyUser],
  ssl: env.DATABASE_SSL === 'true' ? { rejectUnauthorized: false } : false,
  extra: {
    max: env.DATABASE_CONNECTION_MAX,
    idleTimeoutMillis: env.DATABASE_TIMEOUT_CONNECTION,
    connectionTimeoutMillis: env.DATABASE_TIME_WAIT_CONNECTION,
  },
});

export async function initializeDataSource(
  retries = 5,
  delay = 2000,
): Promise<DataSource | undefined> {
  let attempt = 0;
  while (attempt < retries) {
    try {
      await AppDataSource.initialize();
      await AppDataSource.query('SELECT 1');
      console.log('Conexión a DB establecida y verificada');
      return AppDataSource;
    } catch (err) {
      attempt++;
      if (err instanceof Error) {
        console.error(`Intento ${attempt} fallido al conectar a DB: ${err}
        `);
      } else {
        console.error(`Intento ${attempt} fallido al conectar a DB: ${err}
        `);
      }
      if (attempt >= retries) {
        console.error('No se pudo conectar a la DB después de varios intentos');
        process.exit(1);
      }

      await new Promise((res) => setTimeout(res, delay * attempt));
    }
  }
}
