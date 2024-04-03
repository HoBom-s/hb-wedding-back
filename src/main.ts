import { HttpAdapterHost, NestFactory } from "@nestjs/core";
import { AppModule } from "./app.module";
import { winstonLogger } from "./common/utils/winston.config";
import * as Sentry from "@sentry/node";
import { SentryFilter } from "./common/filters/sentry.filter";

async function bootstrap() {
    Sentry.init({
        dsn: process.env.SENTRY_DNS,
    });

    const PORT = 3000;
    const app = await NestFactory.create(AppModule, { logger: winstonLogger });
    const { httpAdapter } = app.get(HttpAdapterHost);

    app.useGlobalFilters(new SentryFilter(httpAdapter));

    await app.listen(PORT, () =>
        console.log(`SERVER IS RUNNING ON PORT ${PORT}`),
    );
}
bootstrap();
