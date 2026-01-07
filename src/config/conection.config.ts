import 'reflect-metadata';
import { DataSource } from 'typeorm';
import * as entities from '../entities/index';
export const AppDataSource = new DataSource({
  type: 'postgres',
  host: process.env.DB_HOST,
  port: Number(process.env.DB_PORT || 5432),
  username: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  synchronize: true,
  logging: process.env.DB_LOGGING === 'false',
  entities: Object.values(entities),
  ssl: process.env.DB_SSL == 'true' ? { rejectUnauthorized: false } : false,
  extra: {
    max: 50,
    idleTimeoutMillis: 30000,
    connectionTimeoutMillis: 5000,
  },
});

export async function initializeDataSource(retries = 5, delay = 2000) {
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
        console.error(`Intento ${attempt} fallido al conectar a DB: ${err?.message}
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
