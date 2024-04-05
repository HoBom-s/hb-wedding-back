import { NestFactory } from "@nestjs/core";
import { ValidationPipe } from "@nestjs/common";
import * as Sentry from "@sentry/node";
import { GLOBAL_ENV } from "./config/global.env.config";
import { SwaggerConfig } from "./config/swagger.config";
import { SentryInterceptor } from "./global/interceptors/sentry.interceptor";
import { HttpExceptionFilter } from "./global/filters/http-exception.filter";
import { AppModule } from "./app.module";
import { winstonLogger } from "./utils/winston.util";

async function bootstrap() {
    Sentry.init({
        dsn: GLOBAL_ENV.SENTRY_DNS,
    });

    const PORT = GLOBAL_ENV.SERVER_PORT;
    const corsOptions = {
        origin: "*",
        methods: ["GET", "POST", "PATCH", "DELETE"],
        allowedHeaders: ["Content-Type", "Authorization"],
        credentials: true,
    };

    const app = await NestFactory.create(AppModule, { logger: winstonLogger });

    app.useGlobalInterceptors(new SentryInterceptor());
    app.useGlobalPipes(
        new ValidationPipe({
            transform: true,
            stopAtFirstError: true,
        }),
    );
    app.useGlobalFilters(new HttpExceptionFilter());

    app.enableCors(corsOptions);

    const swaggerConfig = new SwaggerConfig(app);
    swaggerConfig.init();

    await app.listen(PORT, () =>
        console.log(`SERVER IS RUNNING ON PORT ${PORT}`),
    );
}

bootstrap();
