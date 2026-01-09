"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.env = void 0;
exports.enviroment = enviroment;
const dotenv_1 = __importDefault(require("dotenv"));
const zod_1 = require("zod");
function enviroment() {
    dotenv_1.default.config();
    const envSchema = zod_1.z.object({
        DATABASE_HOST: zod_1.z.string().min(1).nonempty(),
        DATABASE_PORT: zod_1.z.coerce.number().int().min(1).max(65535),
        DATABASE_USER: zod_1.z.string().min(1).nonempty(),
        DATABASE_PASSWORD: zod_1.z.coerce.string().min(1).nonempty(),
        DATABASE_NAME: zod_1.z.string().min(1),
        DATABASE_LOGGING: zod_1.z.string().min(4),
        DATABASE_SYNCHRONIZE: zod_1.z.string().min(4),
        DATABASE_SSL: zod_1.z.string().min(4),
        DATABASE_CONNECTION_MAX: zod_1.z.coerce.number().int().min(1),
        DATABASE_TIME_WAIT_CONNECTION: zod_1.z.coerce.number().int().min(1),
        DATABASE_TIMEOUT_CONNECTION: zod_1.z.coerce.number().int().min(1),
        APP_NODE_ENV: zod_1.z.enum(['development', 'production', 'test']),
        APP_PORT: zod_1.z.coerce.number().int().min(1).max(65535),
    });
    const _env = envSchema.safeParse(process.env);
    if (!_env.success) {
        const flatened = _env.error.flatten();
        console.error(`variables de entorno invalidas ${JSON.stringify(flatened)}
    `);
        process.exit(1);
    }
    return _env.data;
}
exports.env = enviroment();
//# sourceMappingURL=env.config.js.map