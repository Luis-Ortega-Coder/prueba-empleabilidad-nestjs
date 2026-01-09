"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppDataSource = void 0;
exports.initializeDataSource = initializeDataSource;
require("reflect-metadata");
const typeorm_1 = require("typeorm");
const env_config_1 = require("./env.config");
const index_1 = require("../entities/index");
exports.AppDataSource = new typeorm_1.DataSource({
    type: 'postgres',
    host: env_config_1.env.DATABASE_HOST,
    port: env_config_1.env.DATABASE_PORT,
    username: env_config_1.env.DATABASE_USER,
    password: env_config_1.env.DATABASE_PASSWORD,
    database: env_config_1.env.DATABASE_NAME,
    synchronize: env_config_1.env.DATABASE_SYNCHRONIZE === 'true',
    logging: env_config_1.env.DATABASE_LOGGING === 'true',
    entities: [index_1.Access, index_1.Role, index_1.User, index_1.Location, index_1.JobVacancy, index_1.JobVacancyUser],
    ssl: env_config_1.env.DATABASE_SSL === 'true' ? { rejectUnauthorized: false } : false,
    extra: {
        max: env_config_1.env.DATABASE_CONNECTION_MAX,
        idleTimeoutMillis: env_config_1.env.DATABASE_TIMEOUT_CONNECTION,
        connectionTimeoutMillis: env_config_1.env.DATABASE_TIME_WAIT_CONNECTION,
    },
});
async function initializeDataSource(retries = 5, delay = 2000) {
    let attempt = 0;
    while (attempt < retries) {
        try {
            await exports.AppDataSource.initialize();
            await exports.AppDataSource.query('SELECT 1');
            console.log('Conexión a DB establecida y verificada');
            return exports.AppDataSource;
        }
        catch (err) {
            attempt++;
            if (err instanceof Error) {
                console.error(`Intento ${attempt} fallido al conectar a DB: ${err}
        `);
            }
            else {
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
//# sourceMappingURL=conection.config.js.map