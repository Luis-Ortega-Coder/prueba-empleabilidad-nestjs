"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@nestjs/core");
const common_1 = require("@nestjs/common");
const app_module_1 = require("./app.module");
const conection_config_1 = require("./config/conection.config");
const env_config_1 = require("./config/env.config");
async function bootstrap() {
    const app = await core_1.NestFactory.create(app_module_1.AppModule);
    app.enableCors();
    app.useGlobalPipes(new common_1.ValidationPipe({
        whitelist: true,
        forbidNonWhitelisted: true,
        transform: true,
        transformOptions: {
            enableImplicitConversion: false,
        },
        stopAtFirstError: true,
    }));
    (0, env_config_1.enviroment)();
    await (0, conection_config_1.initializeDataSource)();
    await app.listen(env_config_1.env.APP_PORT, () => {
        console.log(`Aplicación ejecutándose en el puerto ${env_config_1.env.APP_PORT}`);
    });
}
bootstrap().catch((err) => {
    console.error('Error al iniciar la aplicación:', err);
    process.exit(1);
});
//# sourceMappingURL=main.js.map