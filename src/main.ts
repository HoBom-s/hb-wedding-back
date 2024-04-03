import { NestFactory } from "@nestjs/core";
import { AppModule } from "./app.module";
import { winstonLogger } from "./common/utils/winston.config";
import * as Sentry from "@sentry/node";
import { SentryInterceptor } from "./global/interceptors/sentry.interceptor";
import { GLOBAL_ENV } from "./config/global.env.config";

async function bootstrap() {
    Sentry.init({
        dsn: GLOBAL_ENV.SENTRY_DNS,
    });

    console.log(GLOBAL_ENV);

    const PORT = GLOBAL_ENV.SERVER_PORT;
    const app = await NestFactory.create(AppModule, { logger: winstonLogger });

    app.useGlobalInterceptors(new SentryInterceptor());

    await app.listen(PORT, () =>
        console.log(`SERVER IS RUNNING ON PORT ${PORT}`),
    );
}

bootstrap();
