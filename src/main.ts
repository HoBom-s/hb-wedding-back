import { NestFactory } from "@nestjs/core";
import { BadRequestException, ValidationPipe } from "@nestjs/common";
import * as Sentry from "@sentry/node";
import { GLOBAL_ENV } from "./config/global.env.config";
import { SwaggerConfig } from "./config/swagger.config";
import { SentryInterceptor } from "./common/interceptors/sentry.interceptor";
import { HttpExceptionFilter } from "./common/filters/http-exception.filter";
import { AppModule } from "./app.module";
import { winstonLogger } from "./utils/winston.util";
import { redisConnection } from "./config/redis.config";

async function bootstrap() {
    await redisConnection();

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

    const app = await NestFactory.create(AppModule, {
        logger: winstonLogger,
        cors: corsOptions,
    });

    app.useGlobalInterceptors(new SentryInterceptor());
    app.useGlobalPipes(
        new ValidationPipe({
            transform: true,
            stopAtFirstError: true,
            exceptionFactory: (errors) => new BadRequestException(errors),
        }),
    );
    app.useGlobalFilters(new HttpExceptionFilter());

    const swaggerConfig = new SwaggerConfig(app);
    swaggerConfig.init();

    await app.listen(PORT, () =>
        console.log(`SERVER IS RUNNING ON PORT ${PORT}`),
    );
}

bootstrap();
